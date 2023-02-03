<script lang="ts">
	import classNames from 'classnames';

	export let href: string = '';
	export let className = '';
</script>

{#if !!href}
	<a
		{href}
		class={classNames(className, 'no-underline text-inherit inline-flex justify-between items-center gap-3')}
	>
		<slot />
	</a>
{:else}
	<button type="button" class={classNames(className, 'plain inline-flex justify-between items-center gap-3')}>
		<slot />
	</button>
{/if}
