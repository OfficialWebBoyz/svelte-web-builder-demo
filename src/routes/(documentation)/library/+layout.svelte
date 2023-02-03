<script lang="ts">
	import Layout from '$lib/components/Layout.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import type { LayoutData } from './$types';
	export let data: LayoutData;
</script>

<Layout includeScrollProgress>
	<PageTransition id={data.routeId}>
		<slot />
	</PageTransition>
</Layout>
