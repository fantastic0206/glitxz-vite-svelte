<script lang="ts">
	// // import type LayoutData from './$types';
	// import { get } from 'svelte/store';
	// import {
	// 	products,
	// 	productFilters,
	// 	productQuery,
	// 	productSearch,
	// 	searchTimeout
	// } from '$lib/stores';
	// import { formatShopifyFilter, getProducts } from '$com/shopify/queries';

	// const startSearchTimer = function (callback: () => void, delay = 2000) {
	// 	searchTimeout.update((n) => {
	// 		if (n) {
	// 			clearTimeout(n);
	// 		}
	// 		return setTimeout(() => {
	// 			callback();
	// 			resetSearchTimer();
	// 		}, delay); // How many ms after the latest input to wait before searching
	// 	});
	// };

	// const resetSearchTimer = function () {
	// 	searchTimeout.update((n) => {
	// 		if (n) {
	// 			clearTimeout(n);
	// 		}
	// 		return undefined;
	// 	});
	// };

	// const newSearch = () => {
	// 	startSearchTimer(async () => {
	// 		const results = await getProducts(get(productSearch));
	// 		products.set(results.products.edges ? results.products.edges.map((edge) => edge.node) : []);
	// 	}, 0);
	// };

	// startSearchTimer(async () => {
	// 	const results = await getProducts(get(productSearch));
	// 	products.set(results.products.edges ? results.products.edges.map((edge) => edge.node) : []);
	// }, 0);
</script>

<slot />
<!-- <ProductFilters search={newSearch} /> -->
