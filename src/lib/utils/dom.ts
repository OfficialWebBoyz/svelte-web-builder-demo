export function buildStyle(obj: Record<string, string>) {
	return Object.entries(obj)
		.map(([key, value]) => {
			return `${key}: ${value}`;
		})
		.join('; ');
}

export function px(value: number) {
	return `${value}px`;
}
