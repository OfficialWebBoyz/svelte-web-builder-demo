<script lang="ts">
	import cn from 'classnames';

	const blockCount = 100;
	const DATA_Key = 'item';
	const COMPONENT_TYPES = {
		accordion: 'accordion',
		customComponent: 'custom-nigga'
	}

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
		const element = checkElement(event.target);
		if (element) {
			element.classList.add('border-orange-500')
		}
	}

	function handleItemDragLeave(event: DragEvent) {
		const element = checkElement(event.target);
		if (element) {
			element.classList.remove('border-orange-500')
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
		const sourceElement = document.getElementById(selectedElementId)
		if (element && sourceElement) {
			console.log({data: e.dataTransfer?.getData(DATA_Key)});
			element.appendChild(sourceElement)
			element.classList.remove('border-orange-500')
		}
		resetState()
	}

	function resetState() {
		isDragging = false;
		selectedElementId = ''
	}
</script>

<main class="x-container">
	<h1>Flavors</h1>

	<div
		id={`draggable-${COMPONENT_TYPES.customComponent}`}
		data-component-type={COMPONENT_TYPES.customComponent}
		draggable="true"
		class={cn('text-xs text-center p-2', isDragging && 'bg-green-200')}
		on:dragstart={handleDragStart}
		on:drag={handleItemDrag}
		on:dragend={handleDragEnd}
	>
		<strong
			class="capitalize text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-orange-400"
		>
			drag <br /> me
		</strong>
	</div>

	<div class="flex flex-wrap gap-2">
		{#each [...Array(blockCount).keys()] as block}
			<div
				id={`drag-element-${block}`}
				class={cn(
					"p-4 border-sky-100 border-2 text-xs inline-flex justify-center items-center",
					'hover:bg-slate-200'
				)}
				on:dragover={(e) => e.preventDefault()}
				on:dragenter={handleItemDragEnter}
				on:dragleave={handleItemDragLeave}
				on:drop={handleDrop}
			>
				{block}
			</div>
		{/each}
	</div>
</main>
