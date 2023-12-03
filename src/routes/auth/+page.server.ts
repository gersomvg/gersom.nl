import { fail, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import { env } from '$env/dynamic/private'

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData()
		if (data.get('name') || !data.get('password') || data.get('password') !== env.ADMIN_TOKEN) {
			return fail(401)
		}
		cookies.set('token', env.ADMIN_TOKEN, {
			sameSite: 'lax',
			httpOnly: true,
			secure: env.PRODUCTION === 'true',
			path: '/',
		})
		throw redirect(303, '/admin/posts')
	},
	logout: async ({ cookies, locals }) => {
		if (locals.isAuthenticated) {
			cookies.delete('token', {
				sameSite: 'lax',
				httpOnly: true,
				secure: env.PRODUCTION === 'true',
				path: '/',
			})
		}
		throw redirect(303, '/auth')
	},
} satisfies Actions
