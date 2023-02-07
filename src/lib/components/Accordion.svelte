<script lang="ts" context="module">
	let parentElement: HTMLElement | null = null;

	export const useAccordion = (el: typeof parentElement) => (parentElement = el);
</script>

<script lang="ts">
	import { speed as speeds } from '$lib/constants/animations';

	import { buildStyle } from '$lib/utils/dom';
	import { onDestroy } from 'svelte';

	export let id: string;
	export let isOpen: boolean | undefined = undefined;
	export let title: string;
	export let speed: number = speeds.regular;

	onDestroy(() => {
		parentElement = null;
	});

	function handleChange(event: Event) {
		const { checked, id } = event.target as HTMLInputElement;
		isOpen = checked;
		if (!parentElement) return;
		const openInputs = parentElement.querySelectorAll('input:checked');
		([...openInputs] as HTMLInputElement[])
			.filter((input) => {
				return input.id !== id;
			})
			.forEach((input) => {
				input.checked = false;
			});
	}
</script>

<div
	class="w-full"
	style={buildStyle({
		'--speed': speed + 'ms'
	})}
>
	<label for={id} class="summary btn" aria-expanded={isOpen}>
		{title}
		<input
			type="checkbox"
			{id}
			class="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
			aria-controls={`${id}-content`}
			on:change={handleChange}
		/>
	</label>
	<div aria-hidden={isOpen} id={`${id}-content`} aria-labelledby={id} class="content">
		<slot />
	</div>
</div>

<style>
	.summary:has(input:checked) ~ .content {
		@apply scale-y-100 h-auto border-black opacity-100 py-3 px-4;
		transition: transform 300ms 10ms ease-in-out, opacity 200ms ease-in-out;
	}

	.summary:has(input:checked) {
		@apply rounded-b-none;
	}

	.summary:has(input:focus) {
		outline: 1px solid #6633ff;
	}

	.summary {
		@apply relative text-inherit w-full block rounded-xl py-3 px-4 border border-black;
	}

	.content {
		@apply border border-transparent scale-y-0 h-0 opacity-0 rounded-b-2xl;
		border-top: none;
		transform-origin: top center;
	}
</style>
