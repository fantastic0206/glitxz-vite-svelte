import type { PageLoadEvent } from './$types';

import { moneyZ } from '$z/shopifyPrimitives';
import type { ProductQueryRawZ } from '$z/shopifyQueries';
import type { ProductListResponseZ } from '$z/shopifyResponses';
import { getProducts } from '$q/shopify/product';
import { formatShopifyFilter, stringifyShopifyQuery } from '$q/shopify/utils';

export const load = async ({ url }: PageLoadEvent) => {
	const query: ProductQueryRawZ = {};
	if (url.searchParams.get('available_for_sale') === 'true') {
		query.available_for_sale = true;
	}
	const createdAtParam = url.searchParams.get('created_at');
	if (createdAtParam !== null && Date.parse(createdAtParam)) {
		query.created_at = new Date(createdAtParam);
	}

	const updatedAtParam = url.searchParams.get('updated_at');
	if (updatedAtParam !== null && Date.parse(updatedAtParam)) {
		query.updated_at = new Date(updatedAtParam);
	}

	if (url.searchParams.has('product_type')) {
		query.product_type = url.searchParams.get('product_type') ?? undefined;
	}
	if (url.searchParams.has('tag')) {
		query.tag = url.searchParams.get('tag')?.split(',');
	}
	if (url.searchParams.has('tag_not')) {
		query.tag_not = url.searchParams.get('tag_not')?.split(',');
	}
	const titleParam = url.searchParams.get('title');
	if (titleParam !== null) {
		query.title = titleParam;
	}
	const priceParam = url.searchParams.get('variants_price') ?? '';
	if (priceParam) {
		const priceJson = JSON.parse(priceParam);
		if (moneyZ.safeParse(priceJson).success) {
			query['variants.price'] = moneyZ.parse(priceJson);
		}
	}
	const vendorParam = url.searchParams.get('vendor');
	if (vendorParam) {
		query.vendor = vendorParam;
	}

	const res: ProductListResponseZ = await getProducts(
		Object.keys(query).length > 0
			? formatShopifyFilter({
					query: stringifyShopifyQuery(query)
			  })
			: undefined
	);
	return {
		products: res.products,
		query
	};
};
