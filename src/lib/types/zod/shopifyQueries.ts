import { z } from 'zod';

import type { JsonZ } from '$z/utils';
import { moneyZ } from '$z/shopifyPrimitives';

// ===============
//     Products
// ===============

export const productQueryRawZ = z
	.object({
		available_for_sale: z.boolean(),
		created_at: z.date(),
		product_type: z.string(),
		tag: z.array(z.string()),
		tag_not: z.array(z.string()),
		title: z.string(),
		updated_at: z.date(),
		'variants.price': moneyZ,
		vendor: z.string(),
		'-available_for_sale': z.boolean(),
		'-created_at': z.date(),
		'-product_type': z.string(),
		'-tag': z.array(z.string()),
		'-tag_not': z.array(z.string()),
		'-title': z.string(),
		'-updated_at': z.date(),
		'-variants.price': z.number(),
		'-vendor': z.string()
	})
	.partial();
export type ProductQueryRawZ = z.infer<typeof productQueryRawZ>;

export const productQueryOptionZ = productQueryRawZ.keyof();
export type ProductQueryOptionZ = z.infer<typeof productQueryOptionZ>;

export const productQueryZ = z.string().refine((queryString) => {
	try {
		const queryRaw = queryString
			.split(/\s*/)
			.map((item) => item.split(':'))
			.reduce((rebuiltJson: ProductQueryRawZ, pair): ProductQueryRawZ => {
				const pairJson: JsonZ = { [pair[0]]: pair[1] };
				productQueryRawZ.parse(pairJson);
				return {
					...rebuiltJson,
					...pairJson
				};
			}, {});
		productQueryRawZ.parse(queryRaw);
		return true;
	} catch (_err) {
		return false;
	}
});
export const isProductQueryOption = function (
	possibleQuery: string
): possibleQuery is ProductQueryOptionZ {
	return productQueryOptionZ.safeParse(possibleQuery).success;
};
export type ProductQueryZ = z.infer<typeof productQueryZ>;

export const productFilterZ = z
	.object({
		after: z.string(),
		before: z.string(),
		first: z.number().int(),
		last: z.number().int(),
		query: productQueryZ
	})
	.partial();
export type ProductFilterZ = z.infer<typeof productFilterZ>;

export const productFilterOptionZ = productFilterZ.keyof();
export type ProductFilterOptionZ = z.infer<typeof productFilterOptionZ>;
export const isProductFilterOption = function (
	possibleFilter: string
): possibleFilter is ProductFilterOptionZ {
	return productFilterOptionZ.safeParse(possibleFilter).success;
};

export const productsFilterFormattedZ = z.string().refine((filterString) => {
	try {
		const filter = filterString
			.split(',')
			.map((item) => item.trim())
			.map((item) => item.split(':'))
			.reduce((rebuiltJson: ProductFilterZ, pair): ProductFilterZ => {
				const pairJson: JsonZ = {};
				if (pair.length >= 2) {
					pairJson[pair[0]] = pair[1];
					productFilterZ.parse(pairJson);
				}
				const newJson: ProductFilterZ = {
					...rebuiltJson,
					...pairJson
				};
				return newJson;
			}, {});
		productFilterZ.parse(filter);
		return true;
	} catch (err) {
		console.error(err);
		return false;
	}
});
export type ProductsFilterFormattedZ = z.infer<typeof productsFilterFormattedZ>;
