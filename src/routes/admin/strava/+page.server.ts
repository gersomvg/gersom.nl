import { db } from '$lib/server/database'
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import { aesCbcDecrypt, aesCbcEncrypt } from '$lib/server/crypto'
import type { Strava } from '$lib/server/database/schema'
import { tokenFromCode } from '$lib/server/strava/api'
import { syncData } from '$lib/server/strava/sync'

const getStrava = db.prepare('SELECT * FROM strava WHERE id=1')

const updateStrava = db.prepare(
	'UPDATE strava SET userId=?, accessToken=?, refreshToken=?, expires=? WHERE id=1',
)

export const load = (async ({ url }) => {
	const code = url.searchParams.get('code')
	if (code) {
		try {
			const json = await tokenFromCode(code)
			updateStrava.run(
				json.athlete.id,
				aesCbcEncrypt(json.access_token),
				aesCbcEncrypt(json.refresh_token),
				new Date(json.expires_at * 1000).toISOString(),
			)
		} catch {
			throw redirect(303, url.origin + url.pathname + '?error')
		}
		throw redirect(303, url.origin + url.pathname + '?success')
	}

	let state: 'success' | 'error' | 'neutral' = 'neutral'
	if (url.searchParams.get('success') != null) state = 'success'
	if (url.searchParams.get('error') != null) state = 'error'

	const strava = getStrava.get() as Strava

	return {
		state,
		strava: {
			...strava,
			accessToken: strava.accessToken && aesCbcDecrypt(strava.accessToken),
			refreshToken: strava.refreshToken && aesCbcDecrypt(strava.refreshToken),
		},
	}
}) satisfies PageServerLoad

export const actions = {
	sync: async () => {
		try {
			await syncData()
			return { syncOk: true }
		} catch (e) {
			return fail(500, { syncMessage: e instanceof Error ? e.message : '' })
		}
	},
} satisfies Actions
