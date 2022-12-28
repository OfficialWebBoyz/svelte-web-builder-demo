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
	export let large: boolean = false;
	export let dimBackdrop: boolean = true;
</script>

<dialog
	id="dialog"
	bind:this={modal}
	class={cn(
		'rounded-2xl md:rounded-md border-2 w-full border-black h-3/5 mb-0 open:animate-slide-up-always-visible md:m-auto md:h-fit md:opacity-0 md:open:animate-slide-up',
		large ? 'md:max-w-3xl' : 'md:max-w-lg',
		dimBackdrop && 'backdrop:bg-slate-800 backdrop:opacity-25 shadow-md'
	)}
>
	<div class="flex justify-between my-2 items-center">
		{#if title}
			<h3 class="my-0">{title}</h3>
		{/if}
		<form method="dialog">
			<button aria-label="close dialog" class="py-0">X</button>
		</form>
	</div>
	<slot />
</dialog>
