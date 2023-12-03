import { redirect, type Handle } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAuthenticated = event.cookies.get('token') === env.ADMIN_TOKEN

	if (event.url.pathname.startsWith('/admin') && !event.locals.isAuthenticated) {
		throw redirect(303, '/auth')
	}

	const response = await resolve(event)
	return response
}
