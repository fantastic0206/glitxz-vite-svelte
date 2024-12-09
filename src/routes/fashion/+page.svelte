<script lang="ts">
	import type { PageData } from './$types';
	import ArticleIndex from '$lib/components/blog/ArticleIndex.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Fashion@Glitxz</title>
</svelte:head>

<ArticleIndex handle="fashion" articles={data.articles} />
