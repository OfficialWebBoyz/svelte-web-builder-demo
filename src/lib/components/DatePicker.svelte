<script lang="ts">
	export let label: string;
	export let id: string;

	const YEARS = 75;

	const today = new Date();
	function modifyYears(numOfYears: number, action: 'increment' | 'decrement', date?: Date) {
		const dateCopy = new Date(date ?? new Date());
		const actions = {
			increment() {
				return dateCopy.getFullYear() + numOfYears;
			},
			decrement() {
				return dateCopy.getFullYear() - numOfYears;
			}
		};
		const method = actions[action];
		dateCopy.setFullYear(method());
		return dateCopy;
	}

	function formatDateInput(date: Date) {
		return date.toISOString().replace(/T.+/, '');
	}

	console.log(formatDateInput(modifyYears(75, 'increment', today)));
	let input: HTMLInputElement | null = null;
</script>

<label for={id}>
	{label}
</label>

<input
	bind:this={input}
	type="date"
	name="date"
	{id}
	pattern="\d{2}/\d{2}/\d{4}"
	value={formatDateInput(today)}
	min={formatDateInput(modifyYears(YEARS, 'decrement', today))}
	max={formatDateInput(modifyYears(YEARS, 'increment', today))}
	on:change={() => {
		if (input) {
			console.log(input.value);
		}
	}}
/>
