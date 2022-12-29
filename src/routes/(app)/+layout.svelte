<script lang="ts">
	import type { LayoutData } from '../$types';

	import PageTransition from '$lib/components/PageTransition.svelte';

	import Layout from '$lib/components/Layout.svelte';

	export let data: LayoutData;
</script>

<Layout>
	<PageTransition id={data.routeId}>
		<slot />
	</PageTransition>
</Layout>
