<script lang="ts">
	import { page } from '$app/stores';
	import type { ColorString } from '$lib/types/color';

	export let href = '/';
	export let color: ColorString = 'primaryGreen';
</script>

<div
	class:active-salmon={$page.route.id == href && color == 'primarySalmon'}
	class:active-cyan={$page.route.id == href && color == 'primaryCyan'}
	class:active-green={$page.route.id == href && color == 'primaryGreen'}
	class:active-red={$page.route.id == href && color == 'primaryRed'}
	class:active-blue={$page.route.id == href && color == 'primaryBlue'}
	class=" my-1 mb-8 origin-top-right rotate-45 rounded-md first:mt-[20px]"
>
	<a {href}>
		<slot />
	</a>
</div>

<style>
	.active-salmon {
		@apply rounded-r-md border-b-2 border-primarySalmon;
	}
	.active-cyan {
		@apply rounded-r-md border-b-2 border-primaryCyan;
	}
	.active-green {
		@apply rounded-r-md border-b-2 border-primaryGreen;
	}

	.active-red {
		@apply rounded-r-md border-b-2 border-primaryRed;
	}

	.active-blue {
		@apply rounded-r-md border-b-2 border-primaryBlue;
	}
</style>
