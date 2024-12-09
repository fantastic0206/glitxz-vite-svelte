<script lang="ts">
	import type { BlogHandleZ } from '$z/shopifyPrimitives';
	import type { ArticleZ } from '$z/shopify';

	export let slideWidth;
	export let article: ArticleZ;
	export let blogHandle: BlogHandleZ | undefined;
	export let placeholderUrl: string =
		'https://images.pexels.com/photos/7372338/pexels-photo-7372338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
</script>

<!-- tailwind cannot handle dynamically generated values for css need to use inline styles here  -->
<div
	style="
			background-repeat: no-repeat;
			background-size: cover;
			background-image: linear-gradient(var(--linear-fade)), url({article.image
		? article.image.url
		: placeholderUrl})"
	class="min-w-screen flex h-screen w-screen flex-col justify-end overflow-x-auto p-3 md:w-[50vw] md:min-w-[50vw]"
	bind:clientWidth={slideWidth}
>
	<div class="flex h-full flex-col justify-end text-clip">
		<h3 class="p-2 text-2xl font-black text-slate-50">{article.title}</h3>
		<p class="p-2 pb-3 pr-9 text-slate-50">
			{article.excerpt
				? article.excerpt.length > 300
					? `${article.excerpt.slice(0, 300)}...`
					: article.excerpt
				: 'Excerptless'}
		</p>
		<a
			class="self-end rounded-xl bg-slate-100 p-2"
			href={`/${blogHandle === 'art' ? 'art/commentary' : blogHandle}/${article.handle}`}
		>
			<button> Read More </button>
		</a>
	</div>
</div>
