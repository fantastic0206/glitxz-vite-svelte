<script lang="ts">
	import type { PageData } from './$types';
	import ProductList from '$com/shopify/ProductList.svelte';
	// import ProductFilters from '$com/shopify/ProductFilters.svelte';
	import { products, productQueryRaw } from '$stores';
	// import { productListResponseZ } from '$z';

	export let data: PageData;

	products.set(data.products?.edges?.map((edge) => edge.node) ?? []);
	productQueryRaw.set(data.query);
</script>

<svelte:head>
	<title>E-Shop</title>
</svelte:head>

<main>
	<h1>Hello</h1>
</main>
<ProductList {products} />
