<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
	import Google from '$lib/components/icon/Google.svelte';

	// let email = '';

	// const handleEmailSignIn = () => {
	// 	signIn('email', { email, callbackUrl: '/dash' });
	// };

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/dash' });
	};

	const handleSignOut = () => {
		signOut();
	};
</script>

<div class="container">
	{#if !$page.data.session}
		<img src="/LogoBlack.png" alt="auth.js logo" class="logo" />
		<h1 class="welcome">Welcome</h1>
		<p class="text">Log in to continue to SvelteKit Auth Example</p>

		<!-- <form on:submit={handleEmailSignIn}>
			<input label="Email" type="email" placeholder="example@gmail.com" bind:value={email} />
			<button>Continue</button>
		</form>

		<div class="divider-container">
			<div />
			<span>OR</span>
			<div />
		</div> -->

		<button on:click={handleGoogleSignIn}>
			<Google /> Continue with Google
		</button>
	{/if}

	{#if $page.data.session}
		<div class="signout-container">
			<img src="/LogoBlack.png" alt="auth.js logo" class="logo" />

			<button on:click={handleSignOut}>Sign out</button>
		</div>
	{/if}
</div>
