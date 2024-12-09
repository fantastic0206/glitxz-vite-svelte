<script lang="ts">
	import type { PageData } from './$types';
	import ArticleIndex from '$lib/components/blog/ArticleIndex.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Art@Glitxz</title>
</svelte:head>

<ArticleIndex handle="art" articles={data.articles} />
