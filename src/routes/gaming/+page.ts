import type { BlogZ } from '$z/shopify';
import { getBlogByHandle } from '$q/shopify/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const blog: BlogZ = await getBlogByHandle('gaming');
	// const games = await getGames -- to be implemented

	return {
		articles: blog?.articles?.edges ? blog.articles.edges.map((node) => node.node) : []
	};
};
