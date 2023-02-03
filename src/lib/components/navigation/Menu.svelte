<script lang="ts">
	import Molecule from './components/Molecule.svelte';
	import type { ItemGroup } from './types';

	export let items: ItemGroup;
</script>

<ul class="list-none">
	{#each Object.entries(items) as [itemKey, itemValue]}
		<Molecule
			infix={['subitem']}
			content={itemValue.content}
			href={itemValue.href}
			hasChildren={!!itemValue.sublevel}
		>
			{#if itemValue.sublevel}
				{#each Object.entries(itemValue.sublevel) as [subKey, subValue]}
					<Molecule
						hasChildren={!!subValue.basement}
						content={subValue.content}
						href={subValue.href}
						infix={['basement']}
					>
						{#if subValue.basement}
							{#each Object.entries(subValue.basement) as [basementKey, lastItem]}
								<Molecule
									hasChildren={false}
									infix={[]}
									content={lastItem.content}
									href={lastItem.href}
								/>
							{/each}
						{/if}
					</Molecule>
				{/each}
			{/if}
		</Molecule>
	{/each}
</ul>
