<script lang="ts">
	import Modal, { triggerModal } from '$lib/components/Modal.svelte';
	import Accordion, { useAccordion } from '$lib/components/Accordion.svelte';
	import FileDrop from '$lib/components/FileDrop.svelte';

	const latin =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

	let allowMultipleAccordionsOpen = true;
	let accordionElement: HTMLElement | null = null;

	$: useAccordion(accordionElement);
</script>

<main>
	<form class="flex flex-col gap-6 x-container">
		<section>
			<h2>Accordion</h2>

			<label for="accordions"> Allow multiple accordions open </label>
			<input
				type="checkbox"
				id="accordions"
				name="accordions"
				checked
				on:change={(e) => {
					allowMultipleAccordionsOpen = e.currentTarget.checked;
				}}
			/>
			{#if allowMultipleAccordionsOpen}
				<div class="grid gap-2">
					<p>Multiple accordions enabled</p>
					<Accordion title="Accordion item">
						{latin}
					</Accordion>
					<Accordion title="Accordion item">
						{latin}
					</Accordion>
				</div>
			{:else}
				<div bind:this={accordionElement} class="grid gap-2">
					<p>Only allow one accordion to be open at a time</p>
					<Accordion id="uno" title="Accordion item">
						{latin}
					</Accordion>
					<Accordion id="dos" title="Accordion item">
						{latin}
					</Accordion>

					<div dir="ltr">
						<pre class="whitespace-pre-line break-words overflow-scroll w-full">
							# Devs
							Multiple accordions are enabled by default. To disable the default functionality,
						
							Javascript:
							let accordionElement: HTMLElement | null = null;
							$: useAccordion(accordionElement);

							HTML:
							&lt;div bind:this={'{accordionElement}'}&gt;
								<span>{'{Accordion}'}</span>
							&lt;div&gt;
						</pre>
					</div>
				</div>
			{/if}
		</section>

		<section>
			<h2>Modal</h2>

			<div>
				<button type="button" on:click={triggerModal}>
					<strong>Trigger modal</strong>
				</button>
				<Modal title="Hello">{latin}</Modal>
			</div>
		</section>

		<section>
			<h2>File Drop</h2>

			<div>
				<FileDrop />
			</div>
		</section>
	</form>
</main>
