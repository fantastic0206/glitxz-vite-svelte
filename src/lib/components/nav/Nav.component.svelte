<script lang="ts">
	import NavMainTopic from './NavMainTopic.component.svelte';
	let navHidden: Boolean = true;

	$: toggleHidden = () => {
		navHidden = !navHidden;
	};
</script>

<nav
	class=" fixed right-0 top-0 z-50 flex flex-col content-end items-center justify-center rounded-bl-xl bg-white drop-shadow-md"
>
	<div class="flex w-full p-2 pt-12">
		<div
			class="flex w-[70px] flex-col justify-end pl-2 duration-500"
			style={!navHidden
				? 'padding-top: 30px;'
				: 'visibility: hidden; height: 0; width: 70px; font-size: 0px; pointer-events: none;'}
		>
			<NavMainTopic href="/" color="primarySalmon">Home</NavMainTopic>
			<NavMainTopic href="/art" color="primaryRed">Art</NavMainTopic>
			<NavMainTopic href="/fashion" color="primaryBlue">Fashion</NavMainTopic>
			<NavMainTopic href="/gaming" color="primaryGreen">Gaming</NavMainTopic>
			<NavMainTopic href="/e-shop" color="primaryCyan">E-Shop</NavMainTopic>
		</div>
	</div>
</nav>

<button
	on:click={toggleHidden}
	on:keypress={toggleHidden}
	class="absolute right-[20px] top-1 z-50 cursor-pointer"
>
	<svg viewBox="0 0 100 80" width="40" height="40">
		<rect width="100" height="20" rx="8" class:active-t={!navHidden} />
		<rect y="30" width="100" height="20" rx="8" />
		<rect y="60" width="100" height="20" rx="8" class:active-b={!navHidden} />
	</svg>
</button>

<style>
	.active-b {
		@apply -translate-x-8 translate-y-6 -rotate-45 duration-500;
	}
	.active-t {
		@apply -translate-y-1 translate-x-6 rotate-45 duration-500;
	}
</style>
