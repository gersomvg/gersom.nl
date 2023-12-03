import { db } from '$lib/server/database'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { env } from '$env/dynamic/private'
import { aesCbcEncrypt } from '$lib/server/crypto'

const updateStrava = db.prepare(
	'UPDATE strava SET accessToken=?, refreshToken=?, expires=? WHERE id=1',
)

export const load = (async ({ url }) => {
	const code = url.searchParams.get('code')
	if (code) {
		const formData = new FormData()
		formData.append('client_id', env.STRAVA_CLIENT_ID)
		formData.append('client_secret', env.STRAVA_CLIENT_SECRET)
		formData.append('code', code)
		formData.append('grant_type', 'authorization_code')
		try {
			const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
				method: 'POST',
				body: formData,
			})
			const json = await response.json()
			updateStrava.run(
				aesCbcEncrypt(json.access_token),
				aesCbcEncrypt(json.refresh_token),
				new Date(json.expires_at * 1000).toISOString(),
			)
		} catch {
			throw redirect(303, url.origin + url.pathname + '?error')
		}
		throw redirect(303, url.origin + url.pathname + '?success')
	}

	console.log(db.prepare('SELECT * FROM strava WHERE id=1').get())

	let state: 'success' | 'error' | 'neutral' = 'neutral'
	if (url.searchParams.get('success') != null) state = 'success'
	if (url.searchParams.get('error') != null) state = 'error'

	return { state }
}) satisfies PageServerLoad
