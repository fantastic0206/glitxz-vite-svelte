<script lang="ts">
	import type { ProductZ } from '$z/shopify';

	export let product: ProductZ;
</script>

<section>
	<div class="product-card">
		<div class="product-card-frame">
			<a href={`/e-shop/${product.handle}`}>
				<img
					class="prodimg"
					src={product.images?.edges ? product.images.edges[0].node.url : ''}
					alt={product.images?.edges ? product.images.edges[0].node.altText : ''}
				/>
			</a>
		</div>
		<div class="product-card-text">
			<h3 class="product-card-title">{product.title ?? product.handle}</h3>
			<p class="product-card-description">{product.description.substring(0, 60) + '...'}</p>
		</div>
		<a href={`/e-shop/${product.handle}`}>
			<button>View Item {'>'}</button>
		</a>
	</div>
</section>
