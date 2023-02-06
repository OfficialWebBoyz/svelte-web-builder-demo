<script lang="ts">
	/**
	 */
	import classNames from 'classnames';
	import NavButton from './NavButton.svelte';
	import type { MoleculeValue } from '../types';

	export let infix: MoleculeValue[];
	export let content: string;
	export let href = '';
	export let hasChildren: boolean;
</script>

<!-- 
	@component
	A Molecule is a group of atoms bonded together. This component is
	intended to be a submenu wrapper that dynamically injects nested list items.
	These list items (atoms) join together to make a molecule (list) 🙃
 -->

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<li class={classNames(infix, 'relative')} tabindex="0">
	<NavButton {href} className={classNames(hasChildren && 'has-children')}>
		{content}
		{#if hasChildren}
			<span>></span>
		{/if}
	</NavButton>

	{#if hasChildren}
		<ul
			class={classNames(
				'list-none border-2 bg-orange-100 rounded-md p-1 top-full absolute max-w-xs w-full transition-all duration-300 friend'
			)}
			style={`z-index: ${infix.length}`}
		>
			<slot />
		</ul>
	{/if}
</li>

<style>
	.friend {
		opacity: 0;
		visibility: hidden;
	}

	/* show top level items when immediate children have focus */
	.subitem:focus-within > .friend,
  /* if subitems have nested subitems then keep the top level visible */
  .subitem:has(.basement .has-children:focus) .friend,
  /* show nested subitems when children have focus */
  .basement:focus-within > .friend {
		opacity: 1;
		visibility: visible;
	}
</style>
