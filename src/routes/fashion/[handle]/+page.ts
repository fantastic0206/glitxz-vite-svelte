import type { PageLoadEvent } from './$types';
import { getArticleByHandle } from '$q/shopify/blog';

export const load = async ({ params }: PageLoadEvent) => {
	const article = await getArticleByHandle('fashion', params.handle);
	return {
		article
	};
};
