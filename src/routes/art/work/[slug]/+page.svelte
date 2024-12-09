<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>{data.artwork.title}</h1>
<div>{@html data.artwork.description}</div>
