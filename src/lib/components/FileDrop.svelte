<script lang="ts">
	import classNames from 'classnames';

	let dropZone: HTMLDivElement | null = null;
	let errorMessage = '';
	let loadProgress: number = 0;
	let files: File[] = [];

	const activeDropZoneClasses = ['text-blue-500', 'border-blue-500'];

	function handleFileDrop(event: DragEvent) {
		event.preventDefault();
		if (!event.dataTransfer?.items) return;
		[...event.dataTransfer.items].forEach((item) => {
			if (item.kind !== 'file') {
				errorMessage = `Upload type ${item.kind} not supported, expected a file`;
				return;
			}

			const file = item.getAsFile();
			if (file && !files.includes(file)) {
				handleFileLoad(file);
				files = files.concat(file);
			}
		});
		dropZone?.classList.remove(...activeDropZoneClasses);
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		errorMessage = '';
		dropZone?.classList.add(...activeDropZoneClasses);
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		dropZone?.classList.remove(...activeDropZoneClasses);
	}

	function handleInputFileUpload(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const uploadFiles = event.currentTarget.files;
		if (!uploadFiles) return;
		[...uploadFiles].forEach((file) => {
			handleFileLoad(file);
			files = files.concat(file);
		});
		errorMessage = '';
	}

	function throttle<T = unknown>(value: T, seconds: number = 1_000): Promise<T> {
		return new Promise((resolve, reject) => {
			return setTimeout(() => resolve(value), seconds);
		});
	}

	function handleFileLoad(file: File) {
		const reader = new FileReader();
		const handle = (event: ProgressEvent<FileReader>) => {
			const percent = event.total > event.loaded ? 100 : (event.loaded / event.total) * 100;
			loadProgress = Math.round(percent);
		};
		reader.addEventListener('progress', handle);
		reader.readAsDataURL(file);
	}

	/**
	 * clear loader state upon submisison
	 */
	$: {
		if (loadProgress >= 100) {
			setTimeout(() => {
				loadProgress = 0;
			}, 5_000);
		}
	}
</script>

<form on:submit={(e) => e.preventDefault()} class="grid gap-4">
	<label for="file-progress">
		Upload progress
		<progress
			id="file-progress"
			max="100"
			style={`--bg-progress: ${loadProgress < 85 ? 'rgb(59, 130, 246)' : 'rgb(168, 85, 247)'};`}
			value={loadProgress}
		>
			{loadProgress}%
		</progress>
	</label>
	<div
		bind:this={dropZone}
		class={classNames(
			'relative h-52 border-dashed border-2 border-gray-400 rounded-md p-10 grid justify-center items-center',
			!!errorMessage ? 'border-red-500 text-red-500' : 'hover:border-blue-500 hover:text-blue-500'
		)}
	>
		<input
			type="file"
			name="file-drop"
			id="file-drop"
			multiple
			accept="image/png, image/jpeg"
			on:change={handleInputFileUpload}
			class="w-full h-full absolute z-[2] cursor-pointer opacity-0"
		/>
		<div
			on:drop={handleFileDrop}
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
			class="w-full h-full absolute"
		/>
		<p>
			{#if errorMessage}
				{errorMessage}
			{:else}
				Drag one or more files into the <i>drop zone</i>, or click up upload.
			{/if}
		</p>
	</div>

	<output>
		<ul>
			{#each files as file}
				<li>{file.name}</li>
			{/each}
		</ul>
	</output>
</form>

<style>
	:root {
		--bg-progress: transparent;
	}
	progress[value] {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		border: none;
		overflow: hidden;
		@apply w-full h-4 rounded-full overflow-hidden;
	}
	progress[value]::-webkit-progress-bar {
		@apply bg-gray-300 rounded-full h-4;
	}
	progress[value]::-webkit-progress-value {
		transition: all 1000ms ease;
		background-color: var(--bg-progress);
		@apply rounded-full h-4;
	}
	progress[value]::-moz-progress-bar {
		transition: all 1000ms ease;
		background-color: var(--bg-progress);
		@apply rounded-full h-4;
	}
</style>
