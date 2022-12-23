<script lang="ts">
	const blockCount = 100;
	const DATA_FORMAT = 'item';
	const ITEM_TYPES = {
		component: 'accordion'
	};

	let isDragging = false;

	function handleDragStart(e: DragEvent) {
		console.log('started');
		e.dataTransfer?.setData(DATA_FORMAT, ITEM_TYPES.component);
	}

	function handleItemDrag(_: DragEvent) {
		isDragging = true;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const element = e.target as HTMLElement | null;
		if (element instanceof HTMLElement) {
			console.log(element?.id, e.dataTransfer?.getData(DATA_FORMAT));
			isDragging = false;
		}
	}
</script>

<main class="x-container">
	<h1>Flavors</h1>

	<div
		draggable="true"
		class="text-xs text-center p-2"
		on:dragstart={handleDragStart}
		on:drag={handleItemDrag}
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
				class="p-4 border-sky-100 border-2 text-xs w-2 h-2 inline-flex justify-center items-center"
				on:dragover={(e) => e.preventDefault()}
				on:drop={handleDrop}
			>
				{block}
			</div>
		{/each}
	</div>
</main>
