import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$com: './src/lib/components',
			'$com/*': './src/lib/components/*',
			$q: './src/lib/queries',
			'$q/*': './src/lib/queries/*',
			$stores: './src/lib/stores',
			$types: './src/lib/types',
			'$types/*': './src/lib/types/*',
			$z: './src/lib/types/zod',
			'$z/*': './src/lib/types/zod/*'
		}
	}
};

export default config;
