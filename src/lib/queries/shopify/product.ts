import { productListResponseZ, productResponseZ } from '$z/shopifyResponses';
import type { ProductsFilterFormattedZ } from '$z/shopifyQueries';
import type { ProductListResponseZ, ProductPromiseZ } from '$z/shopifyResponses';

import { postToShopify } from '$q/shopify/utils';

export const getProducts = async (
	formattedFilter: ProductsFilterFormattedZ = 'sortKey: TITLE, first: 100'
): Promise<ProductListResponseZ> => {
	try {
		const shopifyResponse = await postToShopify({
			query: `{
        products(${formattedFilter}) {
          edges {
            node {
              id
              handle
              description
              title
              totalInventory
              productType
              variants(first: 5) {
                edges {
                  node {
                    id
                    image {
                      id
                      url
                      altText
                    }
                    title
                    quantityAvailable
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    `
		});
		const res = productListResponseZ.parse(shopifyResponse);
		return res;
	} catch (err) {
		console.error(err);
		return {
			products: {
				edges: []
			}
		};
	}
};

export const getProductDetails = async (productHandle: string): ProductPromiseZ => {
	try {
		const shopifyResponse = await postToShopify({
			query: ` 
        query getProduct($handle: String!) {
          product(handle: $handle) {  
            id
            handle
            description
            title
            totalInventory
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    altText
                    id
                    url
                  }
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  altText
                  id
                  url
                }
              }
            }
          }
        }
      `,
			variables: { handle: productHandle }
		});
		const res = productResponseZ.parse(shopifyResponse);
		return res;
	} catch (err) {
		console.error(err);
		return {
			product: {
				title: '',
				id: '',
				description: '',
				images: {}
			}
		};
	}
};
