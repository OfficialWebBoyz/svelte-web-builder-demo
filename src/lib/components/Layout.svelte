<script lang="ts">
	import ScrollProgress from '$lib/components/ScrollProgress.svelte';

	import '../../app.css';

	export let includeScrollProgress: boolean = false;
</script>

<div class="prose prose-cyan max-w-none prose-lg min-h-full flex flex-col justify-between">
	<header class="sticky top-0 left-0 z-50">
		<nav class=" bg-slate-400">
			<div class="flex justify-between py-2 x-container">
				<a href="/">Home</a>

				<div class="flex gap-3">
					<a href="/flavors">Flavors</a>
					<a href="/library">Components library</a>
				</div>
			</div>
			{#if includeScrollProgress}
				<ScrollProgress observableElementId="observable-content" />
			{/if}
		</nav>
	</header>
	<div class="contents">
		<slot />
	</div>
	<footer>
		<div class="x-container flex justify-center">
			<blockquote>Come buy our ice cream and shove it down your throat ;&#41;</blockquote>
		</div>
	</footer>
</div>
