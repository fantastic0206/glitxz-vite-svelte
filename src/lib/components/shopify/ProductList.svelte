<script lang="ts">
	import ProductCard from '$com/shopify/ProductCard.svelte';

	export let products;
</script>

<div class="product-grid flex">
	{#each $products as product}
		<ProductCard {product} />
	{/each}
</div>
