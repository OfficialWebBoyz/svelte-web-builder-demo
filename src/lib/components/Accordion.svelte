<script lang="ts" context="module">
	export function useAccordion(parent: HTMLElement | null) {
		if (!parent) return;
		const accordions = parent.querySelectorAll('details');
		if (accordions.length) {
			accordions.forEach((item) => {
				const triggerButton = item.querySelector('summary');
				triggerButton?.addEventListener('click', (e) => {
					e.preventDefault();
					if (!item.open) {
						accordions.forEach((_item) => {
							_item.open = false;
						});
					}
					item.open = !item.open;
				});
			});
		}
	}
</script>

<script lang="ts">
	/**
	 * controls singular accordion toggling
	 */
	export let id: string = '';
	export let isOpen: boolean | undefined = undefined;
	export let title: string;
</script>

<details {id} open={isOpen} class="rounded-md border-2 py-2 px-3 border-black">
	<summary class="cursor-pointer list-none">{title}</summary>
	<div class="content">
		<slot />
	</div>
</details>

<style>
	details > .content {
		opacity: 0;
		transform: translateY(12px);
	}
	details[open] > .content {
		animation: open-up 300ms ease 1 forwards alternate;
	}

	@keyframes open-up {
		from {
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
