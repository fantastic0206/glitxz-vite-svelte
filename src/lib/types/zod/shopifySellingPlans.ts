import { z } from 'zod';

import { moneyZ, shopifyConnectionZ, shopifyNodeZ } from '$z/shopifyPrimitives';
import { SellingPlanCheckoutChargeType } from '$types/enums';

export const sellingPlanAllocationPriceAdjustmentZ = z.object({
	compareAtPrice: moneyZ.optional(),
	perDeliveryPrice: moneyZ.optional(),
	price: moneyZ.optional(),
	unitPrice: moneyZ.nullable().optional()
});
export const sellingPlanCheckoutChargeTypeZ = z.nativeEnum(SellingPlanCheckoutChargeType);
export const sellingPlanCheckoutChargeValueZ = z.union([
	z.object({
		percentage: z.number()
	}),
	moneyZ
]);
// type SellingPlanAllocationPriceAdjustmentZ = z.infer<typeof sellingPlanAllocationPriceAdjustmentZ>;
export const sellingPlanCheckoutChargeZ = z.object({
	type: sellingPlanCheckoutChargeTypeZ,
	value: sellingPlanCheckoutChargeValueZ
});

export const sellingPlanPriceAdjustmentValueZ = z.union([
	z.object({ adjustmentAmount: moneyZ }),
	z.object({ price: moneyZ }),
	z.object({ adjustmentPercentage: z.number().int() })
]);

export const sellingPlanPriceAdjustmentZ = z.object({
	adjustmentValue: sellingPlanPriceAdjustmentValueZ,
	orderCount: z.number().int().nullable().optional()
});

export const sellingPlanZ = shopifyNodeZ.extend({
	checkoutCharge: sellingPlanCheckoutChargeZ.optional(),
	description: z.string().optional(),
	name: z.string().optional(),
	options: z.array(
		z.object({
			name: z.string().optional(),
			value: z.string().optional()
		})
	),
	priceAdjustments: z.array(sellingPlanPriceAdjustmentZ).optional(),
	recurringDeliveries: z.boolean().optional()
});

export const sellingPlanConnectionZ = shopifyConnectionZ(sellingPlanZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type SellingPlanConnectionZ = z.infer<typeof sellingPlanConnectionZ>;

export const sellingPlanAllocationZ = z.object({
	checkoutChargeAmount: moneyZ.optional(),
	priceAdjustments: z.array(sellingPlanAllocationPriceAdjustmentZ).optional(),
	remainingBalanceChargeAmount: moneyZ.optional(),
	sellingPlan: z.lazy(() => sellingPlanZ).optional()
});
export type SellingPlanAllocationZ = z.infer<typeof sellingPlanAllocationZ>;

export const sellingPlanAllocationConnectionZ = shopifyConnectionZ(sellingPlanAllocationZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type SellingPlanAllocationConnectionZ = z.infer<typeof sellingPlanAllocationConnectionZ>;

export const sellingPlanGroupOptionZ = z.object({
	name: z.string().optional(),
	values: z.array(z.string()).optional()
});
export type SellingPlanGroupOptionZ = z.infer<typeof sellingPlanGroupOptionZ>;

export const sellingPlanGroupZ = z.object({
	appName: z.string().optional(),
	name: z.string().optional(),
	options: z.array(sellingPlanGroupOptionZ).optional(),
	sellingPlans: sellingPlanConnectionZ.optional()
});
export type SellingPlanGroupZ = z.infer<typeof sellingPlanGroupZ>;

export const sellingPlanGroupConnectionZ = shopifyConnectionZ(sellingPlanGroupZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type SellingPlanGroupConnectionZ = z.infer<typeof sellingPlanGroupConnectionZ>;

export const priceRangeZ = z.object({
	maxVariantPrice: moneyZ.optional(),
	minVariantPrice: moneyZ.optional()
});
