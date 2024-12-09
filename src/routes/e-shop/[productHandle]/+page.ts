import type { PageLoadEvent } from './$types';

import type { ProductResponseZ } from '$z/shopifyResponses';
import { getProductDetails } from '$q/shopify/product';

export const load = async ({ params }: PageLoadEvent) => {
	const productHandle: string = params.productHandle;

	const res: ProductResponseZ = await getProductDetails(productHandle);

	return {
		product: res.product,
		productImage: res.product.images?.edges ? res.product.images.edges[0].node.url : '',
		productVariants: res.product.variants?.edges
			? res.product.variants.edges.map((v) => v.node)
			: []
	};
};
