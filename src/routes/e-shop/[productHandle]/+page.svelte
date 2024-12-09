<script lang="ts">
	import type { PageData } from './$types';
	import { product } from '$stores';

	export let data: PageData;

	product.set(data.product);

	let quantity = 0;
	let selectedProduct = data.productVariants[0].id;

	const addToCart = async () => {
		// add selected product to cart
		try {
			const addToCartResponse = await fetch('/api/add-to-cart', {
				method: 'POST',
				body: JSON.stringify({
					cartId: localStorage.getItem('cartId'),
					itemId: selectedProduct,
					quantity: quantity
				})
			});
			const data = await addToCartResponse.json();

			// save new cart to localStorage
			localStorage.setItem('cartId', data.id);
			localStorage.setItem('cart', JSON.stringify(data));
			location.reload();
		} catch (e) {
			console.log(e);
		}
	};
</script>

<main class="product-page">
	<article>
		<section class="product-page-content">
			<div>
				<img class="product-page-image" src={data.productImage} alt={$product.handle} />
			</div>
			<div>
				<h1>{$product.title}</h1>
				<p>{$product.description}</p>
				<form>
					{#if data.productVariants.length > 1}
						<div class="product-page-price-list">
							{#each data.productVariants as { id, quantityAvailable, title, price }}
								<div class="product-page-price">
									<input
										{id}
										bind:value={selectedProduct}
										type="radio"
										name="merchandiseId"
										disabled={quantityAvailable === 0}
									/>
									<label for={id}>
										{title} - {price?.amount}
										{price?.currencyCode}
									</label>
								</div>
							{/each}
						</div>
					{:else}
						<div class="product-page-price is-solo">
							{#if data.productVariants[0]}
								{data.productVariants[0].price?.amount}
								{data.productVariants[0].price?.currencyCode}
							{/if}
						</div>
					{/if}
					<div class="product-page-quantity-row">
						<input
							class="product-page-quantity-input"
							type="number"
							name="quantity"
							min="1"
							max={data.productVariants[0].quantityAvailable}
							bind:value={quantity}
						/>

						<button type="submit" on:click|preventDefault={addToCart} class="button purchase">
							Add to Cart
						</button>
					</div>
				</form>
			</div>
		</section>
	</article>
</main>
