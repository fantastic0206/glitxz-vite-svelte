import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
	const session = await event.locals.getSession();
	return {
		session
	};
};
