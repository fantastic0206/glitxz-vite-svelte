import { z } from 'zod';
import { jsonZ } from '$z/utils';

import * as enums from '$types/enums';

export const displayableErrorZ = z.object({
	field: z.array(z.string()).optional(),
	message: z.string().optional()
});

export const shopifyNodeZ = z.object({
	id: z.string()
});
export type ShopifyNodeZ = z.infer<typeof shopifyNodeZ>;

export const onlineStorePublishableZ = z.object({
	onlineStoreUrl: z.string().url().nullable().optional()
});
export type OnlineStorePublishableZ = z.infer<typeof onlineStorePublishableZ>;

export const trackableZ = z.object({
	trackingParameters: z.string().optional()
});
export type TrackableZ = z.infer<typeof trackableZ>;

export const shopifyAttributeZ = z.object({
	key: z.string(),
	value: z.string().optional()
});
export type ShopifyAttributeZ = z.infer<typeof shopifyAttributeZ>;

export const shopifyEdgeZ = function <T extends z.ZodTypeAny>(typeDefinition: T) {
	return z.object({
		cursor: z.string().optional(),
		node: typeDefinition
	});
};
export type ShopifyEdgeZ<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof shopifyEdgeZ<T>>>;

export const shopifyFilterTypeZ = z.nativeEnum(enums.ShopifyFilterType);
export type ShopifyFilterTypeEnumZ = z.infer<typeof shopifyFilterTypeZ>;

export const shopifyFilterValueZ = shopifyNodeZ.extend({
	count: z.number().int().optional(),
	input: jsonZ.optional(),
	label: z.string().optional()
});
export type ShopifyFilterValueZ = z.infer<typeof shopifyFilterValueZ>;

export const shopifyFilterZ = shopifyNodeZ.extend({
	label: z.string().optional(),
	type: shopifyFilterTypeZ.optional(),
	values: z.array(shopifyFilterValueZ).optional()
});
export const shopifyPageInfoZ = z.object({
	endCursor: z.string().optional(),
	hasNextPage: z.boolean().optional(),
	hasPreviousPage: z.boolean().optional(),
	startCursor: z.string().optional()
});

// This is a generator for a type definition! Not a type definition
export const shopifyConnectionZ = function <T extends z.ZodTypeAny>(typeDefinition: T) {
	return z.object({
		edges: z.array(shopifyEdgeZ<T>(typeDefinition)).optional(),
		nodes: z.array(typeDefinition).optional(),
		pageInfo: shopifyPageInfoZ.optional(),
		filters: z.array(shopifyFilterZ).optional(),
		totalCount: z.number().int().min(0).optional()
	});
};
export type ShopifyConnectionZ<T extends z.ZodTypeAny> = z.infer<
	ReturnType<typeof shopifyConnectionZ<T>>
>;

export const shopifyImageZ = shopifyNodeZ.extend({
	altText: z.string().nullable(),
	height: z.number().int().optional(),
	width: z.number().int().optional(),
	url: z.string()
});
export type ShopifyImageZ = z.infer<typeof shopifyImageZ>;

export const imageConnectionZ = shopifyConnectionZ(shopifyImageZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type ImageConnectionZ = z.infer<typeof imageConnectionZ>;

export const countryCodeZ = z.nativeEnum(enums.CountryCode);
export const currencyCodeZ = z.nativeEnum(enums.CurrencyCode);
export const unitPriceMeasurementMeasuredTypeZ = z.nativeEnum(
	enums.UnitPriceMeasurementMeasuredType
);
export const unitPriceMeasurementMeasuredUnit = z.nativeEnum(
	enums.UnitPriceMeasurementMeasuredUnit
);
export const weightUnitZ = z.nativeEnum(enums.WeightUnit);

export const moneyZ = z.object({
	amount: z.coerce.number(),
	currencyCode: currencyCodeZ
});
export type MoneyZ = z.infer<typeof moneyZ>;

export const unitPriceMeasurementZ = z.object({
	measuredType: unitPriceMeasurementMeasuredTypeZ.optional(),
	quantityUnit: unitPriceMeasurementMeasuredUnit.optional(),
	quantityValue: z.number().int().optional(),
	referenceUnit: unitPriceMeasurementMeasuredUnit.optional(),
	referenceValue: z.number().int().optional()
});
export type UnitPriceMeasurementZ = z.infer<typeof unitPriceMeasurementZ>;

export const addressZ = z.object({
	address1: z.string().optional(),
	address2: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	formatted: z.array(z.string()),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
	phone: z.string().optional(),
	province: z.string().optional(),
	provinceCode: z.string().optional(),
	zip: z.string().optional()
});

export const mailingAddressZ = shopifyNodeZ.merge(addressZ).extend({
	company: z.string().optional(),
	countryCodeV2: countryCodeZ.optional(),
	firstName: z.string().optional(),
	formattedArea: z.string().optional(),
	lastName: z.string().optional(),
	name: z.string().optional()
});
export type MailingAddressZ = z.infer<typeof mailingAddressZ>;

export const mailingAddressConnectionZ = shopifyConnectionZ(mailingAddressZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type MailingAddressConnectionZ = z.infer<typeof mailingAddressConnectionZ>;

export const inventoryAddressZ = addressZ.extend({
	countryCode: countryCodeZ.optional()
});
export type InventoryAddressZ = z.infer<typeof inventoryAddressZ>;

export const shopifySeoZ = z.object({
	description: z.string().optional(),
	title: z.string().optional()
});
export type ShopifySeoZ = z.infer<typeof shopifySeoZ>;

export const mediaContentTypeZ = z.nativeEnum(enums.MediaContentType);
export const mediaPresentationZ = shopifyNodeZ.extend({
	asJson: jsonZ
});

export const media = shopifyNodeZ.extend({
	alt: z.string().optional(),
	mediaContentType: mediaContentTypeZ.optional(),
	presentation: mediaPresentationZ.optional(),
	previewImage: shopifyImageZ.optional()
});

export const mediaConnectionZ = shopifyConnectionZ(media)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type MediaConnectionZ = z.infer<typeof mediaConnectionZ>;

export const orderCancelReasonZ = z.nativeEnum(enums.OrderCancelReason);
export const orderFulfillmentStatusZ = z.nativeEnum(enums.OrderFulfillmentStatus);
export const orderFinancialStatusZ = z.nativeEnum(enums.OrderFinancialStatus);

export const discountApplicationAllocationMethodZ = z.nativeEnum(
	enums.DiscountApplicationAllocationMethod
);
export const discountApplicationTargetSelectionZ = z.nativeEnum(
	enums.DiscountApplicationTargetSelection
);
export const discountApplicationTargetTypeZ = z.nativeEnum(enums.DiscountApplicationTargetType);

export const pricingValueZ = z.union([
	moneyZ,
	z.object({
		percentage: z.number()
	})
]);
export type PricingValueZ = z.infer<typeof pricingValueZ>;

export const discountApplicationZ = z.object({
	applicationMethod: discountApplicationAllocationMethodZ.optional(),
	targetSelection: discountApplicationTargetSelectionZ.optional(),
	targetType: discountApplicationTargetTypeZ.optional(),
	value: pricingValueZ.optional()
});
export type DiscountApplicationZ = z.infer<typeof discountApplicationZ>;

export const discountApplicationConnectionZ = shopifyConnectionZ(discountApplicationZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type DiscountApplicationConnectionZ = z.infer<typeof discountApplicationConnectionZ>;

export const discountAllocationZ = z.object({
	allocatedAmount: moneyZ.optional(),
	discountApplication: discountApplicationZ.optional()
});
export type DiscountAllocationZ = z.infer<typeof discountAllocationZ>;

export const appliedGiftCardZ = shopifyNodeZ.extend({
	amountUsed: moneyZ,
	balance: moneyZ,
	lastCharacters: z.string(),
	presentmentAmountUsed: moneyZ
});
export type AppliedGiftCardZ = z.infer<typeof appliedGiftCardZ>;

export const shippingRateZ = z.object({
	handle: z.string().optional(),
	price: moneyZ,
	title: z.string().optional()
});
export type ShippingRateZ = z.infer<typeof shippingRateZ>;

// export const checkoutZ = shopifyNodeZ.extend({
//   completedAt: z.date(),
// });

export const cartLineCostZ = z.object({
	amountPerQuantity: moneyZ,
	compareAtAmountPerQuantity: moneyZ.optional(),
	subtotalAmount: moneyZ,
	totalAmount: moneyZ
});
export type CartLineCostZ = z.infer<typeof cartLineCostZ>;

export const cartDiscountAllocationZ = z.object({
	discountedAmount: moneyZ
});
export type CartDiscountAllocationZ = z.infer<typeof cartDiscountAllocationZ>;

export const cartDiscountCodeZ = z.object({
	applicable: z.boolean(),
	code: z.string()
});

export const cartCostZ = z.object({
	checkoutChargeAmount: moneyZ,
	subtotalAmount: moneyZ,
	subtotalAmountEstimated: z.boolean(),
	totalAmount: moneyZ,
	totalAmountEstimated: z.boolean(),
	totalDutyAmount: moneyZ.optional(),
	totalDutyAmountEstimated: z.boolean(),
	totalTaxAmount: moneyZ.optional(),
	totalTaxAmountEstimated: z.boolean()
});
export type CartCostZ = z.infer<typeof cartCostZ>;

export const deliveryMethodTypeZ = z.nativeEnum(enums.DeliveryMethodType);

export const cartDeliveryOptionZ = z.object({
	code: z.string().optional(),
	deliveryMethodType: deliveryMethodTypeZ.optional(),
	description: z.string().optional(),
	estimatedCost: moneyZ.optional(),
	handle: z.string().optional(),
	title: z.string().optional()
});
export type CartDeliveryOptionZ = z.infer<typeof cartDeliveryOptionZ>;

export const cartErrorCodeZ = z.nativeEnum(enums.CartErrorCode);

export const blogHandleZ = z.union([z.literal('art'), z.literal('fashion'), z.literal('gaming')]);
export type BlogHandleZ = z.infer<typeof blogHandleZ>;

export const articleAuthorZ = z.object({
	bio: z.string().optional(),
	email: z.string().email().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	name: z.string().optional()
});
export type ArticleAuthorZ = z.infer<typeof articleAuthorZ>;
