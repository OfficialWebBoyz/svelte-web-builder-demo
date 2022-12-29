<script lang="ts">
	import { speed } from '$lib/constants/animations';

	export let id: string;

	function handlePageAnimation(node: HTMLElement) {
		// grab first child since element is display contents
		const firstChild = node.children[0];
		firstChild.animate(
			[
				{
					opacity: 0,
					transform: 'translateY(-10%)'
				},
				{
					opacity: 1,
					transform: 'translateY(0)'
				}
			],
			{
				duration: speed.regular,
				direction: 'alternate',
				fill: 'forwards',
				easing: 'linear',
				iterations: 1
			}
		);
		return {};
	}
</script>

{#key id}
	<div use:handlePageAnimation class="page-transition-wrapper">
		<slot />
	</div>
{/key}

<style>
	.page-transition-wrapper {
		display: contents;
	}
	.page-transition-wrapper > :global(*) {
		flex-grow: 1;
		width: 100%;
		position: relative;
	}
</style>
