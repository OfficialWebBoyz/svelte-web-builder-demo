<script lang="ts" context="module">
	let parentElement: HTMLElement | null = null;

	export const useAccordion = (el: typeof parentElement) => (parentElement = el);
</script>

<script lang="ts">
	import { speed as speeds } from '$lib/constants/animations';

	import { buildStyle, px } from '$lib/utils/dom';
	import { onDestroy, onMount } from 'svelte';

	export let id: string = '';
	export let isOpen: boolean | undefined = undefined;
	export let title: string;
	export let speed: number = speeds.regular;

	/**
	 * unset max width for open accordions on window reseize for responsiveness
	 * */
	onMount(() => {
		window.addEventListener('resize', () => {
			const openDetails = document.querySelectorAll('details[open]');

			[...openDetails].forEach((element) => {
				const details = element as HTMLDetailsElement;
				const content = details.querySelector('.content') as HTMLElement;
				content && content.style.setProperty('--content-height', 'auto');
			});
		});

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			speed = speeds.quick;
		}
	});

	onDestroy(() => {
		parentElement = null;
	});

	function handleOpen(content: HTMLElement) {
		content.classList.remove('closed');
		content.classList.add('control');
		content.style.setProperty('--content-height', px(content.offsetHeight));
	}

	function handleClose(content: HTMLElement, callback: VoidFunction) {
		content.classList.add('closed');
		content.classList.remove('control');
		callback();
	}

	function handleToggle(event: Event) {
		if (!speed) return;
		const element = event.target as HTMLElement;
		const content = element.nextElementSibling as HTMLElement;
		const details = element.parentElement as HTMLDetailsElement;
		if (!content) return;
		const wasOpen = !details.open;

		const onClick = (open: boolean) => {
			if (open) {
				handleOpen(content);
			} else {
				event.preventDefault();
				handleClose(content, () => {
					setTimeout(() => {
						details.open = false;
					}, speed);
				});
			}
		};

		// single accordion
		if (parentElement) {
			onClick(wasOpen);
			const accordions = parentElement?.querySelectorAll('details');
			[...accordions]
				.filter((item) => {
					return item.id !== details.id;
				})
				.forEach((item) => {
					handleClose(item.querySelector('.content')!, () => {
						setTimeout(() => {
							item.open = false;
						}, speed);
					});
				});
		} else {
			onClick(wasOpen);
		}
	}
</script>

<details
	{id}
	open={isOpen}
	class="rounded-md border-2 py-2 px-3 border-black overflow-hidden"
	style={buildStyle({
		'--speed': speed + 'ms'
	})}
>
	<summary on:click={handleToggle} class="cursor-pointer list-none">{title}</summary>
	<div class="content closed control">
		<slot />
	</div>
</details>

<style>
	@keyframes fade {
		from {
			opacity: 0;
			max-height: 0;
		}
		to {
			opacity: 1;
			max-height: var(--content-height);
		}
	}
	@keyframes close {
		from {
			opacity: 1;
			max-height: var(--content-height, 1000px);
		}
		to {
			opacity: 0;
			max-height: 0;
		}
	}

	.content {
		height: fit-content;
	}

	.content.closed {
		animation: close var(--speed) ease 1 forwards;
	}

	details[open] .content.control {
		animation: fade var(--speed) ease 1 forwards;
	}
</style>
