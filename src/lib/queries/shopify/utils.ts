import {
	PUBLIC_SHOPIFY_API_ENDPOINT,
	PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN
} from '$env/static/public';
import { isProductFilterOption, isProductQueryOption } from '$z/shopifyQueries';
import type {
	ProductFilterZ,
	ProductsFilterFormattedZ,
	ProductQueryZ,
	ProductQueryRawZ
} from '$z/shopifyQueries';

export const stringifyShopifyQuery = function (queryRaw: ProductQueryRawZ): ProductQueryZ {
	let query = '';
	Object.keys(queryRaw).forEach((key: string) => {
		if (isProductQueryOption(key)) {
			if (typeof queryRaw[key] === 'object') {
				query += `${key}:'${JSON.stringify(queryRaw[key])}' `;
			} else {
				query += `${key}:'${queryRaw[key]}' `;
			}
		}
	});
	return query;
};

export const formatShopifyFilter = function (filter: ProductFilterZ): ProductsFilterFormattedZ {
	let filterString = '';
	Object.keys(filter).forEach((key: string) => {
		if (isProductFilterOption(key)) {
			const valueStringified = key === 'query' ? `"${filter[key]}"` : `${filter[key]}`;
			filterString += `${key}:${valueStringified} `;
		}
	});
	return filterString;
};

export const postToShopify = async ({
	query,
	variables
}: {
	query: string; //obviously this should be a graphql type rather than string
	variables?: { [key: string]: any };
}) => {
	const result = await fetch(PUBLIC_SHOPIFY_API_ENDPOINT, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Access-Control-Allow-Origin': 'http://localhost:5173',
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN
		},
		body: JSON.stringify({ query, variables })
	})
		.then((res) => res.json())
		.then((res) => {
			return res;
		});

	if (result.errors) {
		return { errors: result.errors };
	} else if (!result || !result.data) {
		console.log({ result });
		return 'No results found.';
	}
	return result.data;
};
