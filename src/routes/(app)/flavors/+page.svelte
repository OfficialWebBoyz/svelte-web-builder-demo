<script lang="ts">
	import cn from 'classnames';
	import Modal, { triggerModal } from '$lib/components/Modal.svelte';

	const blockCount = 300;
	const DATA_Key = 'item';
	const COMPONENT_TYPES = {
		accordion: 'accordion',
		customComponent: 'custom-nigga'
	};

	let editMode = false;
	let isDragging = false;
	/**
	 * this represents what is currently being dragged
	 */
	let selectedElementId = '';

	function checkElement(target: EventTarget | null) {
		return target && target instanceof HTMLElement ? target : null;
	}

	function handleDragStart(e: DragEvent) {
		const element = checkElement(e.target);
		if (element) {
			selectedElementId = element.id;
			e.dataTransfer?.setData(DATA_Key, element.getAttribute('data-component-type') ?? 'wtf');
		}
	}

	function handleItemDragEnter(event: DragEvent) {
		console.log(event);
		const element = checkElement(event.target);
		if (element) {
			element.classList.add('!border-orange-500');
		}
	}

	function handleItemDragLeave(event: DragEvent) {
		const element = checkElement(event.target);
		if (element) {
			element.classList.remove('!border-orange-500');
		}
	}

	function handleItemDrag(_: DragEvent) {
		isDragging = true;
	}

	function handleDragEnd(_: DragEvent) {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const element = checkElement(e.target);
		const sourceElement = document.getElementById(selectedElementId);
		if (element && sourceElement) {
			console.log({ data: e.dataTransfer?.getData(DATA_Key) });
			element.appendChild(sourceElement);
			element.classList.remove('!border-orange-500');
		}
		resetState();
	}

	function resetState() {
		isDragging = false;
		selectedElementId = '';
	}
</script>

<main class="x-container">
	<h1>Flavors</h1>

	<div class="grid gap-3">
		<div>
			<button
				type="button"
				id={`draggable-${COMPONENT_TYPES.customComponent}`}
				data-component-type={COMPONENT_TYPES.customComponent}
				draggable={editMode}
				class={cn('text-center p-2 capitalize', isDragging && 'bg-green-200')}
				on:dragstart={handleDragStart}
				on:drag={handleItemDrag}
				on:dragend={handleDragEnd}
				on:click={triggerModal}
			>
				Trigger modal
				<!-- text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-orange-400 -->
			</button>

			<Modal title="hello">this is a modal with children</Modal>
		</div>

		<fieldset class="p-3 border-2 rounded-md">
			<legend class="px-1"> Edit mode </legend>
			<div>
				<span>Enable edit mode to drag components around on the page</span>
				<br />
				<label for="edit-mode">
					{#if editMode}
						Edit mode enabled
					{:else}
						Enable edit mode
					{/if}
					<input
						name="edit-mode"
						id="edit-mode"
						type="checkbox"
						on:change={(e) => (editMode = e.currentTarget.checked)}
					/>
				</label>
			</div>
		</fieldset>

		<!-- the stuff -->
		<div class="flex flex-wrap gap-2">
			{#each [...Array(blockCount).keys()] as block}
				<div
					id={`drag-element-${block}`}
					class={cn(
						'p-4 inline-flex border justify-center items-center',
						editMode ? 'border-sky-100' : 'border-transparent'
					)}
					on:dragover={(e) => e.preventDefault()}
					on:dragenter={handleItemDragEnter}
					on:dragleave={handleItemDragLeave}
					on:drop={handleDrop}
				/>
			{/each}
		</div>
	</div>
</main>
