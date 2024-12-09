import { SvelteKitAuth } from '@auth/sveltekit';
import GoogleProvider from '@auth/core/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error }) {
	console.error(error);

	return {
		message: 'Server side error'
	};
}

const authorization = (async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/authenticated')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/auth');
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}) satisfies Handle;

export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
		pages: {
			signIn: '/login',
			signOut: '/logout'
		},
		trustHost: true
	}),
	authorization
);
