export interface Item {
	content: string;
	href?: string;
}

export interface ItemGroup {
	[key: string]: Item & {
		sublevel?: {
			[key: string]: Item & {
				basement?: {
					[key: string]: Item;
				};
			};
		};
	};
}

const moleculeClasses = {
	sub: 'subitem',
	basement: 'basement'
} as const;

type MolecularKey = keyof typeof moleculeClasses;
export type MoleculeValue = typeof moleculeClasses[MolecularKey];
