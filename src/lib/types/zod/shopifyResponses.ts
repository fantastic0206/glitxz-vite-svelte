import { z } from 'zod';
import { cartErrorCodeZ, displayableErrorZ } from '$z/shopifyPrimitives';
import { cartZ, productZ, productConnectionZ } from '$z/shopify';

export const cartMutationResponseZ = z.promise(
	z.object({
		cart: cartZ.partial(),
		userErrors: z.array(
			displayableErrorZ.extend({
				code: cartErrorCodeZ.optional()
			})
		)
	})
);
export type CartMutationResponseZ = z.infer<typeof cartMutationResponseZ>;

export const productResponseZ = z.object({
	product: productZ
});
export type ProductResponseZ = z.infer<typeof productResponseZ>;

export const productPromiseZ = z.promise(productResponseZ);
export type ProductPromiseZ = z.infer<typeof productPromiseZ>;

export const productListResponseZ = z.object({
	products: productConnectionZ
});
export type ProductListResponseZ = z.infer<typeof productListResponseZ>;

export const productListPromiseZ = z.promise(productListResponseZ);
export type ProductListPromiseZ = z.infer<typeof productListPromiseZ>;
