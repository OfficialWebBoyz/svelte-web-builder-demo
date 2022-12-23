<script lang="ts">
	import { speed } from '$lib/constants/animations';

	export let id: string;

	function handlePageAnimation(node: HTMLElement, pageId: string) {
		node.animate(
			[
				{
					opacity: 0,
					transform: 'translateY(-10%)'
				},
				{
					opacity: 1,
					transform: 'translateY(10%)'
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
	<div use:handlePageAnimation={id} class="contents [&>*]:flex-grow [&>*]:w-full">
		<slot />
	</div>
{/key}
