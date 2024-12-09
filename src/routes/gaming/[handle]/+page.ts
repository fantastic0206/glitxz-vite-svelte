import type { PageLoadEvent } from './$types';
import { getArticleByHandle } from '$q/shopify/blog';

export const load = async ({ params }: PageLoadEvent) => {
	const article = await getArticleByHandle('gaming', params.handle);
	return {
		article
	};
};
