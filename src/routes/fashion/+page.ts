import type { BlogZ } from '$z/shopify';
import { getBlogByHandle } from '$q/shopify/blog';

export const load = async () => {
	const blog: BlogZ = await getBlogByHandle('fashion');
	// const fashions = await getFashions -- to be implemented

	return {
		articles: blog?.articles?.edges ? blog.articles.edges.map((node) => node.node) : []
	};
};
