import { z } from 'zod';
import type { WeightUnit } from '$types/enums';

import {
	appliedGiftCardZ,
	articleAuthorZ,
	cartCostZ,
	cartDeliveryOptionZ,
	cartDiscountAllocationZ,
	cartDiscountCodeZ,
	cartLineCostZ,
	countryCodeZ,
	currencyCodeZ,
	discountAllocationZ,
	discountApplicationConnectionZ,
	imageConnectionZ,
	inventoryAddressZ,
	mailingAddressConnectionZ,
	mediaConnectionZ,
	moneyZ,
	onlineStorePublishableZ,
	mailingAddressZ,
	orderCancelReasonZ,
	orderFinancialStatusZ,
	orderFulfillmentStatusZ,
	shippingRateZ,
	shopifyAttributeZ,
	shopifyConnectionZ,
	shopifyImageZ,
	shopifyNodeZ,
	shopifySeoZ,
	trackableZ,
	unitPriceMeasurementZ,
	weightUnitZ
} from '$z/shopifyPrimitives';

import type {
	ArticleAuthorZ,
	MoneyZ,
	ShopifyConnectionZ,
	ShopifyImageZ,
	ShopifyNodeZ,
	UnitPriceMeasurementZ,
	OnlineStorePublishableZ,
	TrackableZ,
	ShopifySeoZ
} from '$z/shopifyPrimitives';
import {
	priceRangeZ,
	sellingPlanAllocationZ,
	sellingPlanGroupConnectionZ,
	sellingPlanAllocationConnectionZ
} from '$z/shopifySellingPlans';
import type { SellingPlanAllocationConnectionZ } from '$z/shopifySellingPlans';

// ==============
//   Metafields
// ==============

export const metafieldReferenceZ = z.lazy(() => z.union([productZ, productVariantZ])); // can also add: Collection | GenericFile | MediaImage | Metaobject | Page | Video
export type MetafieldReferenceZ = z.infer<typeof metafieldReferenceZ>;

export const metafieldReferenceConnectionZ = shopifyConnectionZ(metafieldReferenceZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type MetafieldReferenceConnectionZ = z.infer<typeof metafieldReferenceConnectionZ>;

export const metafieldZ: z.ZodSchema = shopifyNodeZ.extend({
	createdAt: z.date().optional(),
	description: z.string().optional(),
	key: z.string().optional(),
	namespace: z.string().optional(),
	parentResource: z.lazy(() =>
		z.union([
			articleZ,
			blogZ,
			cartZ,
			shopifyCollectionZ,
			customerZ,
			shopifyLocationZ,
			productZ,
			productVariantZ
		])
	), // not included yet, but could be in future: market, order, page, shop
	reference: metafieldReferenceZ.optional(),
	references: metafieldReferenceConnectionZ.optional(),
	type: z.string().optional(), // https://shopify.dev/docs/apps/custom-data/metafields/types
	updatedAt: z.date().optional(),
	value: z.string().optional()
});
export type MetafieldZ = z.infer<typeof metafieldZ>;

export const metafieldConnectionZ = shopifyConnectionZ(metafieldZ);
export type MetafieldConnectionZ = z.infer<typeof metafieldConnectionZ>;

export const hasMetafieldsZ = z.object({
	metafield: metafieldZ.optional(),
	metafields: metafieldConnectionZ.optional()
});
export type HasMetafieldsZ = z.infer<typeof hasMetafieldsZ>;

// ==============
//    Locations
// ==============

export const shopifyLocationZ = shopifyNodeZ.merge(hasMetafieldsZ).extend({
	address: inventoryAddressZ.optional(),
	name: z.string().optional()
});
export type ShopifyLocationZ = z.infer<typeof shopifyLocationZ>;

export const locationConnectionZ = shopifyConnectionZ(shopifyLocationZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type LocationConnectionZ = ShopifyConnectionZ<typeof shopifyLocationZ>;

// =======================
//   Store Availability
// =======================

export const storeAvailabilityZ = z.object({
	available: z.boolean().optional(),
	location: shopifyLocationZ.optional(),
	pickUpTime: z.string().optional(),
	quantityAvailable: z.number().int().optional()
});
export type StoreAvailabilityZ = z.infer<typeof storeAvailabilityZ>;

export const storeAvailabilityConnectionZ = shopifyConnectionZ(storeAvailabilityZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type StoreAvailabilityConnectionZ = z.infer<typeof storeAvailabilityConnectionZ>;

// =======================
//    Products/Variants
// =======================

export type ProductVariantZ = ShopifyNodeZ &
	HasMetafieldsZ & {
		availableForSale?: boolean;
		barcode?: string;
		compareAtPrice?: MoneyZ;
		currentlyNotInStock?: boolean;
		image?: ShopifyImageZ;
		price?: MoneyZ;
		product?: ProductZ;
		quantityAvailable?: number;
		title?: string;
		requiresShipping?: boolean;
		selectedOptions?: {
			name: string;
			value: string;
		};
		sellingPlanAllocations?: SellingPlanAllocationConnectionZ;
		sku?: string;
		storeAvailability?: StoreAvailabilityConnectionZ;
		unitPrice?: MoneyZ;
		unitPriceMeasurement?: UnitPriceMeasurementZ;
		weight?: number;
		weightUnit?: WeightUnit;
	};
export const productVariantZ: z.ZodSchema<ProductVariantZ> = z
	.object({
		availableForSale: z.boolean().optional(),
		barcode: z.string().optional(),
		compareAtPrice: moneyZ.optional(),
		currentlyNotInStock: z.boolean().optional(),
		image: shopifyImageZ,
		price: moneyZ,
		product: z.lazy(() => productZ).optional(),
		quantityAvailable: z.number().optional(),
		requiresShipping: z.boolean().optional(),
		title: z.string().optional(),
		selectedOptions: z
			.object({
				name: z.string(),
				value: z.string()
			})
			.optional(),
		sellingPlanAllocations: sellingPlanAllocationConnectionZ.optional(),
		sku: z.string().optional(),
		storeAvailability: storeAvailabilityConnectionZ.optional(),
		unitPrice: moneyZ.optional(),
		unitPriceMeasurement: unitPriceMeasurementZ.optional(),
		weight: z.number().optional(),
		weightUnit: weightUnitZ.optional()
	})
	.merge(shopifyNodeZ)
	.merge(hasMetafieldsZ);

export const productVariantConnectionZ = shopifyConnectionZ(productVariantZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type ProductVariantConnectionZ = z.infer<typeof productVariantConnectionZ>;

export const productZ = z
	.object({
		availableForSale: z.boolean().optional(),
		compareAtPriceRange: priceRangeZ.optional(),
		collections: z.lazy(() => collectionConnectionZ).optional(),
		createdAt: z.date().optional(),
		description: z.string(),
		descriptionHtml: z.string().optional(), //todo: HTML parsing
		featuredImage: shopifyImageZ.optional(),
		handle: z.string().optional(),
		isGiftCard: z.boolean().optional(),
		images: imageConnectionZ,
		media: mediaConnectionZ.optional(),
		options: z
			.array(
				shopifyNodeZ.extend({
					name: z.string(),
					values: z.array(z.string())
				})
			)
			.optional(),
		priceRange: priceRangeZ.optional(),
		productType: z.string().optional(),
		publishedAt: z.date().optional(),
		requiresSellingPlan: z.boolean().optional(),
		sellingPlanGroups: sellingPlanGroupConnectionZ.optional(),
		seo: shopifySeoZ.optional(),
		tags: z.array(z.string()).optional(),
		title: z.string(),
		totalInventory: z.number().int().optional(),
		updatedAt: z.date().optional(),
		variantBySelectedOptions: productVariantZ.optional(),
		variants: productVariantConnectionZ.optional(),
		vendor: z.string().optional()
	})
	.merge(hasMetafieldsZ)
	.merge(shopifyNodeZ)
	.merge(onlineStorePublishableZ)
	.merge(trackableZ);
export type ProductZ = z.infer<typeof productZ>;

export const productConnectionZ = shopifyConnectionZ(productZ)
	.pick({
		edges: true,
		filters: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type ProductConnectionZ = z.infer<typeof productConnectionZ>;

// ==============
//   Collections
// ==============

export type ShopifyCollectionZ = ShopifyNodeZ &
	HasMetafieldsZ &
	OnlineStorePublishableZ &
	TrackableZ & {
		description?: string;
		descriptionHtml?: string;
		handle?: string;
		image?: ShopifyImageZ;
		products?: ProductConnectionZ;
		seo?: ShopifySeoZ;
		title?: string;
		updatedAt?: Date;
	};

export const shopifyCollectionZ: z.ZodSchema<ShopifyCollectionZ> = z
	.object({
		description: z.string().optional(),
		descriptionHtml: z.string().optional(), //todo: HTML parsing
		handle: z.string().optional(),
		image: shopifyImageZ.optional(),
		products: productConnectionZ.optional(),
		seo: shopifySeoZ.optional(),
		title: z.string().optional(),
		updatedAt: z.date().optional()
	})
	.merge(hasMetafieldsZ)
	.merge(shopifyNodeZ)
	.merge(onlineStorePublishableZ)
	.merge(trackableZ);

export const collectionConnectionZ = shopifyConnectionZ(shopifyCollectionZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true,
		totalCount: true
	})
	.partial();
export type CollectionConnectionZ = z.infer<typeof collectionConnectionZ>;

// ==============
//      Cart
// ==============

export const orderLineItemZ = z.object({
	currentQuantity: z.number().int().optional(),
	customAttributes: z.array(shopifyAttributeZ).optional(),
	discountAllocations: z.array(discountAllocationZ).optional(),
	discountedTotalPrice: moneyZ.optional(),
	originalTotalPrice: moneyZ.optional(),
	quantity: z.number().int().optional(),
	title: z.string().optional(),
	variant: productVariantZ.optional()
});
export type OrderLineItemZ = z.infer<typeof orderLineItemZ>;

export const orderLineItemConnectionZ = shopifyConnectionZ(orderLineItemZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type OrderLineItemConnectionZ = z.infer<typeof orderLineItemConnectionZ>;

export const fulfillmentLineItemZ = z.object({
	lineItem: orderLineItemZ,
	quantity: z.number().int()
});

export const fulfillmentLineItemConnectionZ = shopifyConnectionZ(fulfillmentLineItemZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type FulfillmentLineItemConnectionZ = z.infer<typeof fulfillmentLineItemConnectionZ>;

export const orderFulfillmentZ = z.object({
	fulfillmentLineItems: fulfillmentLineItemConnectionZ.optional(),
	trackingCompany: z.string().optional(),
	trackingInfo: z
		.array(
			z.object({
				number: z.string().optional(),
				url: z.string().url().optional()
			})
		)
		.optional()
});
export type OrderFulfillmentZ = z.infer<typeof orderFulfillmentZ>;

export const shopifyOrderZ = shopifyNodeZ.merge(hasMetafieldsZ).extend({
	billingAddress: mailingAddressZ.optional(),
	cancelReason: orderCancelReasonZ.optional(),
	canceledAt: z.date().optional(),
	currencyCode: currencyCodeZ,
	currentSubtotalPrice: moneyZ,
	currentTotalDuties: moneyZ.optional(),
	currentTotalPrice: moneyZ,
	currentTotalTax: moneyZ,
	customAttributes: z.array(shopifyAttributeZ).optional(),
	customerLocale: z.string().optional(),
	customerUrl: z.string().url().optional(),
	discountApplications: discountApplicationConnectionZ.optional(),
	edited: z.boolean().optional(),
	email: z.string().email().optional(),
	financialStatus: orderFinancialStatusZ.optional(),
	fulfillmentStatus: orderFulfillmentStatusZ.optional(),
	lineItems: orderLineItemConnectionZ,
	name: z.string().optional(),
	orderNumber: z.number().int(),
	originalTotalDuties: moneyZ.optional(),
	originalTotalPrice: moneyZ.optional(),
	phone: z.string().optional(),
	processedAt: z.date().optional(),
	shippingAddress: mailingAddressZ.optional(),
	shippingDiscountAllocations: z.array(discountAllocationZ).optional(),
	statusUrl: z.string().url().optional(),
	subtotalPrice: moneyZ.optional(),
	successfulFulfillments: orderFulfillmentZ.optional(),
	totalPrice: moneyZ.optional(),
	totalRefunded: moneyZ.optional(),
	totalShippingPrice: moneyZ.optional(),
	totalTax: moneyZ.optional()
});
export type shopifyOrderZ = z.infer<typeof shopifyOrderZ>;

export const orderConnectionZ = shopifyConnectionZ(shopifyOrderZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true,
		totalCount: true
	})
	.partial();
export type OrderConnectionZ = z.infer<typeof orderConnectionZ>;

export const checkoutLineItemZ = shopifyNodeZ.extend({
	customAttributes: z.array(shopifyAttributeZ).optional(),
	discountAllocations: z.array(discountAllocationZ).optional(),
	quantity: z.number().int(),
	title: z.string(),
	unitPrice: moneyZ.optional(),
	variant: productVariantZ.optional()
});
export type CheckoutLineItemZ = z.infer<typeof checkoutLineItemZ>;

export const checkoutLineItemConnectionZ = shopifyConnectionZ(checkoutLineItemZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type CheckoutLineItemConnectionZ = z.infer<typeof checkoutLineItemConnectionZ>;

export const shopifyCheckoutZ = shopifyNodeZ.extend({
	appliedGiftCards: z.array(appliedGiftCardZ).optional(),
	availableShippingRates: z
		.object({
			ready: z.boolean(),
			shippingRates: z.array(shippingRateZ)
		})
		.optional(),
	buyerIdentity: z.object({ countryCode: countryCodeZ }),
	completedAt: z.date().optional(),
	createdAt: z.date(),
	currencyCode: currencyCodeZ,
	customAttributes: z.array(shopifyAttributeZ),
	discountApplications: discountApplicationConnectionZ,
	email: z.string().email().optional(),
	lineItems: checkoutLineItemConnectionZ,
	lineItemsSubtotalPrice: moneyZ,
	note: z.string().optional(),
	order: shopifyOrderZ,
	orderStatusUrl: z.string().url().optional(),
	paymentDue: moneyZ,
	ready: z.boolean(),
	requiresShipping: z.boolean(),
	shippingAddress: mailingAddressZ.optional(),
	shippingDiscountAllocations: z.array(discountAllocationZ).optional(),
	shippingLine: shippingRateZ.optional(),
	subtotalPrice: moneyZ,
	taxExempt: z.boolean().optional(),
	taxesIncluded: z.boolean(),
	totalDuties: moneyZ.optional(),
	totalPrice: moneyZ,
	totalTax: moneyZ,
	updatedAt: z.date(),
	webUrl: z.string().url()
});
export type ShopifyCheckoutZ = z.infer<typeof shopifyCheckoutZ>;

export const customerZ = shopifyNodeZ
	.merge(hasMetafieldsZ)
	.extend({
		acceptsMarketing: z.boolean(),
		addresses: mailingAddressConnectionZ,
		createdAt: z.date(),
		defaultAddress: mailingAddressZ.optional(),
		discountApplications: discountApplicationConnectionZ,
		displayName: z.string(),
		email: z.string().email().optional(),
		firstName: z.string().optional(),
		lastIncompleteCheckout: shopifyCheckoutZ.optional(),
		lastName: z.string().optional(),
		numberOfOrders: z.number().int().min(0),
		orders: orderConnectionZ,
		phone: z.string().optional(),
		tags: z.array(z.string()),
		updatedAt: z.date()
	})
	.partial();
export type CustomerZ = z.infer<typeof customerZ>;

export const cartBuyerIdentityZ = z
	.object({
		countryCode: countryCodeZ.optional(),
		customer: customerZ.optional(),
		deliveryAddressPreferences: z.array(mailingAddressZ),
		email: z.string().optional(),
		phone: z.string().optional(),
		walletPreferences: z.array(z.string())
	})
	.partial();

export const baseCartLineZ = shopifyNodeZ.extend({
	attribute: shopifyAttributeZ.optional(),
	attributes: z.array(shopifyAttributeZ).optional(),
	cost: cartLineCostZ,
	discountAllocations: z.array(cartDiscountAllocationZ).optional(),
	merchandise: productVariantZ,
	quantity: z.number().int(),
	sellingPlanAllocation: sellingPlanAllocationZ.optional()
});
export type BaseCartLineZ = z.infer<typeof baseCartLineZ>;

export const baseCartLineConnectionZ = shopifyConnectionZ(baseCartLineZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type BaseCartLineConnectionZ = z.infer<typeof baseCartLineConnectionZ>;

export const cartDeliveryGroupZ = shopifyNodeZ.extend({
	cartLines: baseCartLineConnectionZ,
	deliveryAddress: mailingAddressZ.optional(),
	deliveryOptions: z.array(cartDeliveryOptionZ),
	selectedDeliveryOption: cartDeliveryOptionZ.optional()
});
export type CartDeliveryGroup = z.infer<typeof cartDeliveryGroupConnectionZ>;

export const cartDeliveryGroupConnectionZ = shopifyConnectionZ(cartDeliveryGroupZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type CartDeliveryGroupConnectionZ = z.infer<typeof cartDeliveryGroupConnectionZ>;

export const cartZ = shopifyNodeZ
	.extend({
		attribute: shopifyAttributeZ.optional(),
		attributes: z.array(shopifyAttributeZ).optional(),
		buyerIdentity: cartBuyerIdentityZ.optional(),
		checkoutUrl: z.string().url().optional(),
		cost: cartCostZ,
		createdAt: z.date().optional(),
		deliveryGroups: cartDeliveryGroupConnectionZ.optional(),
		discountAllocations: z.array(cartDiscountAllocationZ).optional(),
		discountCodes: z.array(cartDiscountCodeZ).optional(),
		lines: baseCartLineConnectionZ,
		note: z.string().optional(),
		totalQuantity: z.number().int().optional(),
		updatedAt: z.date().optional()
	})
	.merge(hasMetafieldsZ);
export type CartZ = z.infer<typeof cartZ>;

// ==============
//     Blogs
// ==============

export type ArticleZ = ShopifyNodeZ &
	HasMetafieldsZ &
	OnlineStorePublishableZ &
	TrackableZ & {
		authorV2: ArticleAuthorZ;
		blog?: BlogZ;
		content?: string;
		contentHtml?: string;
		excerpt?: string | null;
		excerptHtml?: string | null;
		handle: string;
		image?: ShopifyImageZ | null;
		publishedAt: Date;
		seo?: ShopifySeoZ;
		tags: Array<string>;
		title: string;
	};
export const articleZ: z.ZodSchema<ArticleZ> = z
	.object({
		authorV2: articleAuthorZ,
		blog: z.lazy(() => blogZ).optional(),
		content: z.string().optional(),
		contentHtml: z.string().optional(),
		excerpt: z.string().nullish(),
		excerptHtml: z.string().nullish(),
		handle: z.string(),
		image: shopifyImageZ.nullish(),
		publishedAt: z.date(),
		seo: shopifySeoZ.optional(),
		tags: z.array(z.string()),
		title: z.string()
	})
	.merge(hasMetafieldsZ)
	.merge(onlineStorePublishableZ)
	.merge(shopifyNodeZ)
	.merge(trackableZ);

export const articleConnectionZ = shopifyConnectionZ(articleZ)
	.pick({
		edges: true,
		nodes: true,
		pageInfo: true
	})
	.partial();
export type ArticleConnectionZ = z.infer<typeof articleConnectionZ>;

export const blogZ = z
	.object({
		articles: articleConnectionZ.optional(),
		authors: z.array(articleAuthorZ).optional(),
		handle: z.string(),
		seo: shopifySeoZ.optional(),
		title: z.string()
	})
	.merge(shopifyNodeZ)
	.merge(hasMetafieldsZ)
	.merge(onlineStorePublishableZ);
export type BlogZ = z.infer<typeof blogZ>;

export const blogConnectionZ = shopifyConnectionZ(blogZ).pick({
	edges: true,
	nodes: true,
	pageInfo: true
});
export type BlogConnectionZ = z.infer<typeof blogConnectionZ>;
