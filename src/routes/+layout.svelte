<script lang="ts">
	import type { LayoutData } from './$types';

	import PageTransition from '$lib/components/PageTransition.svelte';

	import '../app.css';

	export let data: LayoutData;
</script>

<div class="prose prose-cyan max-w-none prose-lg h-full flex flex-col justify-between">
	<nav class="sticky top-0 left-0 bg-slate-400">
		<div class="flex justify-between py-2 x-container">
			<a href="/">Home</a>

			<div class="flex gap-3">
				<a href="/flavors">Flavors</a>
				<a href="/library">Components library</a>
			</div>
		</div>
	</nav>

	<PageTransition id={data.routeId}>
		<slot />
	</PageTransition>

	<footer>
		<div class="x-container flex justify-center">
			<blockquote>Come buy our ice cream and shove it down your throat ;&#41;</blockquote>
		</div>
	</footer>
</div>
