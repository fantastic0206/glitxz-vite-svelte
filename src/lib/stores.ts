import { derived, writable } from 'svelte/store';
import type { Readable, Writable } from 'svelte/store';
import type { ProductFilterZ, ProductQueryRawZ } from '$z/shopifyQueries';
import type { ProductZ } from '$z/shopify';
import type { ProductListResponseZ, ProductResponseZ } from '$z/shopifyResponses';

import { formatShopifyFilter, stringifyShopifyQuery } from '$q/shopify/utils';

export const searchTimeout: Writable<NodeJS.Timeout | undefined> = writable();

export const productQueryRaw: Writable<ProductQueryRawZ> = writable({});
export const productFilters: Writable<ProductFilterZ> = writable({
	sortKey: 'TITLE',
	first: 100
});

export const productQuery: Readable<string> = derived(
	productQueryRaw,
	($productQueryRaw) => {
		return stringifyShopifyQuery($productQueryRaw);
	},
	''
);

export const productSearch = derived(
	[productFilters, productQuery],
	([$productFilters, $productQuery]) =>
		formatShopifyFilter({
			...$productFilters,
			query: $productQuery
		})
);

export const productsResponse: Writable<ProductListResponseZ> = writable();
export const products: Writable<Array<ProductZ>> = writable([]);

export const productResponse: Writable<ProductResponseZ> = writable();
export const product: Writable<ProductZ> = writable();
// export const productDetails: Writable<ProductZ> = writable();
