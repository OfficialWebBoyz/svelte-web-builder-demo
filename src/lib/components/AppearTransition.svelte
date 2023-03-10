<script lang="ts">
	export let replay: boolean = true;

	let visible = false;
	let ref: HTMLElement | null = null;
	function useIntersectionObserver(cb: IntersectionObserverCallback) {
		if (typeof window === 'undefined') return {};
		return {
			observer: new IntersectionObserver(cb, {
				root: null,
				threshold: 0.1
			})
		};
	}

	const { observer } = useIntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			visible = entry.isIntersecting;
			if (!replay) observer.unobserve(entry.target);
		});
	});

	$: {
		if (observer && ref) {
			observer.observe(ref);
		}
	}
</script>

<div bind:this={ref}>
	{#if visible}
		<slot />
	{/if}
</div>
