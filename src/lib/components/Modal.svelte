<script lang="ts" context="module">
	// from the server we could load customization properties
	// that are applied for a given user ... 🤔
	let modal: HTMLDialogElement;

	export function triggerModal() {
		if (modal) {
			modal.showModal();
		}
	}
</script>

<script lang="ts">
	import cn from 'classnames';

	export let title: string = '';
	export let dimBackdrop: boolean = true;
</script>

<dialog
	id="dialog"
	bind:this={modal}
	class={cn(
		'rounded-md border-2 border-black max-w-7xl',
		dimBackdrop && 'backdrop:bg-slate-800 backdrop:opacity-25 shadow-md'
	)}
>
	<div class="flex justify-between my-2 items-center">
		{#if title}
			<h3 class="my-0">{title}</h3>
		{/if}
		<form method="dialog">
			<button aria-label="close dialog"> X </button>
		</form>
	</div>
	<slot />
</dialog>

<style>
	dialog {
		opacity: 0;
	}
	dialog[open] {
		animation: slide-up 200ms ease-in 25ms 1 forwards;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(-12px);
		}
	}
</style>
