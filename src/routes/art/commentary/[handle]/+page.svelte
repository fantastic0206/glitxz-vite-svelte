<script lang="ts">
	import type { PageData } from './$types';
	import ArticleFull from '$lib/components/blog/ArticleFull.svelte';

	export let data: PageData;
</script>

<ArticleFull article={data.article}/>
