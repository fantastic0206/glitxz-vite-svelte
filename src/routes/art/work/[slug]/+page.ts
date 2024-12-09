import type { PageLoadEvent } from './$types';

export const load = ({ params }: PageLoadEvent) => {
	// const artwork = getArtworkBy(params.slug) -- to implement
	const artwork = {
		title: 'Glitxz piece of art',
		description: "<p>Here's would be the HTML description to accompany an art piece</p>"
	};
	return {
		artwork
	};
};
