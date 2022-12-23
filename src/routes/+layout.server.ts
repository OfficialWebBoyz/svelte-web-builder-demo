import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ route }) => {
	let id = route.id === '/' ? 'home' : route.id?.slice(1).replace('/', '-');
	id = id + '-path';
	return {
		routeId: id
	};
};
