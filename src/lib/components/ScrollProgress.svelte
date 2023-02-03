<script lang="ts">
	import { onMount } from 'svelte';
	export let observableElementId: string;

	/**
	 * @see https://www.w3schools.com/howto/howto_js_scroll_indicator.asp
	 */
	onMount(() => {
		const element = document.getElementById('myBar');
		const observableElement = document.getElementById(observableElementId);
		if (!element || !observableElement) return;
		window.onscroll = () => {
			const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			const height = observableElement.scrollHeight - document.documentElement.clientHeight;

			const scrolled = Math.min(100, (winScroll / height) * 100);
			element.style.width = `${scrolled}%`;
		};
	});
</script>

<div class="w-full h-2 bg-slate-200">
	<div class="h-2 bg-gradient-to-r from-blue-500 to-purple-500 w-0" id="myBar" />
</div>
