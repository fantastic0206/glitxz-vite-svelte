import { cartMutationResponseZ } from '$z/shopifyResponses';
import type { CartMutationResponseZ } from '$z/shopifyResponses';

import { postToShopify } from '$q/shopify/utils';

export const addItemToCart = async (
	cartId: string,
	itemId: string,
	quantity: number
): CartMutationResponseZ => {
	const shopifyResponse = await postToShopify({
		query: `
      mutation addItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      product {
                        title
                        handle
                      }
                    }
                  }
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    `,
		variables: {
			cartId,
			lines: [
				{
					merchandiseId: itemId,
					quantity
				}
			]
		}
	});
	return cartMutationResponseZ.parse(shopifyResponse);
};
