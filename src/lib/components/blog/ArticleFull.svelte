<script lang="ts">
  import type { ArticleZ } from "$lib/types/zod/shopify";
	import ArticleContent from "./ArticleContent.svelte";
	
  export let article: ArticleZ;
</script>

<div class="flex flex-col items-center">
  <div class="flex md:flex-row flex-col w-4/5 justify-evenly items-center my-[3%]">
    <img
    class=" object-cover md:w-3/5 w-9/12 mb-[3%] rounded-2xl shadow-xl" 
    src={article.image?.url} alt={article.image?.altText}
    >

    <h1 class="pt-12 px-12 pb-4 md:w-2/5 font-navigo font-black text-5xl text-primaryRed">
      {article.title}
    </h1>
  </div>
  <div class="w-full flex justify-center py-[3%] bg-slate-100 shadow-2 xl">
    <ArticleContent articleContent = {article.contentHtml}></ArticleContent>
  </div>
</div>
