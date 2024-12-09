import { postToShopify } from '$q/shopify/utils';
import { articleZ, blogZ } from '$z/shopify';
import type { ArticleZ, BlogZ } from '$z/shopify';
import type { BlogHandleZ, ShopifyEdgeZ } from '$z/shopifyPrimitives';

export const getBlogByHandle = async (blogHandle: BlogHandleZ): Promise<BlogZ> => {
	try {
		const shopifyResponse = await postToShopify({
			query: `
        query getBlog($blogHandle: String!) {
          blog(handle: $blogHandle) {
            handle
            id
            title
            articles(first: 5) {
              edges {
                node {
                  authorV2 {
                    firstName
                    name
                  }
                  excerpt
                  handle
                  id
                  image {
                    altText
                    id
                    url
                  }
                  publishedAt
                  tags
                  title
                }
              }
            }
            
          }
        }
      `,
			variables: {
				blogHandle
			}
		});
		const blog = shopifyResponse.blog;
		blog.articles?.edges?.forEach((edge: ShopifyEdgeZ<typeof articleZ>) => {
			if (edge?.node) {
				edge.node.publishedAt = new Date(edge.node.publishedAt);
			}
		});
		const parsedBlog = blogZ.parse(blog);
		return parsedBlog;
	} catch (err) {
		console.error(err);
		return {
			id: 'none',
			articles: {
				edges: []
			},
			handle: 'news',
			title: 'News'
		};
	}
};
export const getArticleById = async (articleId: string): Promise<ArticleZ> => {
	try {
		const shopifyResponse = await postToShopify({
			query: `
        query getArticle($articleId: String!) {
          article(id: $articleId) {
           {
              authorV2 {
                firstName
                name
              }
              blog
              content
              contentHtml
              excerpt
              excerptHtml
              handle
              id
              image {
                altText
                id
                url
              }
              publishedAt
              seo
              tags
              title
            }
          }
        }
      `,
			variables: {
				articleId
			}
		});
		const article = {
			...shopifyResponse.article,
			publishedAt: new Date(shopifyResponse.article.publishedAt)
		};
		const parsedArticle = articleZ.parse(article);
		return parsedArticle;
	} catch (err) {
		console.error(err);
		return {
			id: '404',
			authorV2: {},
			handle: '',
			publishedAt: new Date(),
			title: '',
			tags: []
		};
	}
};
export const getArticleByHandle = async (
	blogHandle: string,
	articleHandle: string
): Promise<ArticleZ> => {
	try {
		const shopifyResponse = await postToShopify({
			query: `
        query getBlogArticle($blogHandle: String!, $articleHandle: String!) {
          blog(handle: $blogHandle){
            articleByHandle(handle: $articleHandle) {
              authorV2 {
                firstName
                name
              }
              content
              contentHtml
              excerpt
              excerptHtml
              handle
              id
              image {
                altText
                id
                url
              }
              publishedAt
              tags
              title
            }
          }
        }
      `,
			variables: {
				blogHandle,
				articleHandle
			}
		});
		const article = {
			...shopifyResponse.blog.articleByHandle,
			publishedAt: new Date(shopifyResponse.blog.articleByHandle.publishedAt)
		};
		const parsedArticle = articleZ.parse(article);
		return parsedArticle;
	} catch (err) {
		console.error(err);
		return {
			id: '404',
			authorV2: {},
			handle: '',
			publishedAt: new Date(),
			title: '',
			tags: []
		};
	}
};
