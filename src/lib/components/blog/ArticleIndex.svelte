<script lang="ts">
	import type { BlogHandleZ } from '$z/shopifyPrimitives';
	import type { ArticleZ } from '$z/shopify';
	import ArticlePreview from '$lib/components/blog/ArticlePreview.svelte';

	export let articles: Array<ArticleZ> = [];
	export let handle: BlogHandleZ;

	let speedX: number = 30;
	let move: number = 0;
	let duration: number = 350;
	let slideW: number;
	let windowW: number;
	let lefMove: boolean = true;
	let interval: ReturnType<typeof setTimeout>;
	let isScroll: boolean = false;

	$: setScroll = (isHovered: boolean) => {
		clearInterval(interval);
		isScroll = isHovered;
		interval = setInterval(() => {
			if (isScroll) {
				move += speedX;
				console.log(slideW);
				if (move >= slideW * articles.length - slideW * (windowW > 768 ? 2 : 1) - 8 || move <= 0) {
					speedX = speedX * -1;
					lefMove = !lefMove;
					clearInterval(interval);
				}
			}
		}, 50);
	};

	$: onresize = () => {
		lefMove = true;
		speedX = Math.abs(speedX);
	};
</script>

<svelte:window on:resize={onresize} bind:innerWidth={windowW} />
{#if lefMove}
	<div
		on:focus
		on:mouseover={() => {
			setScroll(true);
		}}
		on:mouseleave={() => {
			setScroll(false);
		}}
		class=" fixed right-5 top-[55vh] z-10 cursor-pointer select-none rounded-full border-2 border-white p-5 text-3xl text-white"
	>
		&#x2192;
	</div>
{/if}
{#if !lefMove}
	<div
		on:focus
		on:mouseover={() => {
			setScroll(true);
		}}
		on:mouseleave={() => {
			setScroll(false);
		}}
		class=" fixed left-5 top-[55vh] z-10 cursor-pointer rounded-full border-2 border-white p-5 text-3xl text-white"
	>
		&#8592;
	</div>
{/if}
<div class="no-scrollbar w-screen overflow-hidden scroll-smooth">
	<div
		class="flex w-max"
		style:transform="translateX({`${-move}`}px)"
		style:transition="transform {duration}ms"
	>
		{#each articles as article (article.id)}
			<ArticlePreview blogHandle={handle} {article} bind:slideWidth={slideW} />
		{:else}
			<p>No articles!</p>
		{/each}
	</div>
</div>
