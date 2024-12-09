<script lang="ts">
	import { onMount } from 'svelte';
	import { Application } from '@splinetool/runtime';

	let canvas: any;
	let loading: boolean = true;

	onMount(() => {
		let app = new Application(canvas);
		loading = true;
		app.load('https://prod.spline.design/96iJztRrs5s989VU/scene.splinecode').finally(() => {
			loading = false;
		});
	});
</script>

{#if loading}
	<div class=" z-[1000] grid h-screen w-screen place-items-center">loading</div>
{/if}
<div class=" absolute z-[-1] grid h-screen w-screen place-items-center">
	<canvas bind:this={canvas} />
</div>
