import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { threlteSplineTypesPlugin } from 'threlte-spline/dist/types-plugin';

export default defineConfig({
	plugins: [sveltekit(),threlteSplineTypesPlugin()],
	ssr:{
		noExternal:['three', 'troika-three-text']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
