import { HTTPNotOkError } from '$lib/fetch'
import { aesCbcDecrypt, aesCbcEncrypt } from '../crypto'
import { db } from '../database'
import type { Strava } from '../database/schema'
import { stats, tokenFromRefresh } from './api'

const selectStrava = db.prepare('SELECT * FROM strava WHERE id=1')
const updateStravaStats = db.prepare('UPDATE strava SET data=?, updated=? WHERE id=1')

export const syncData = async ({ skipExpiryCheck = false, skip401Refresh = false } = {}) => {
	const strava = selectStrava.get() as Strava
	strava.accessToken &&= aesCbcDecrypt(strava.accessToken)
	strava.refreshToken &&= aesCbcDecrypt(strava.refreshToken)

	if (
		strava.accessToken == null ||
		strava.refreshToken == null ||
		strava.expires == null ||
		strava.userId == null
	) {
		throw new Error(
			"Can't sync without an access token, refresh token, token expiry and Strava user id.",
		)
	}

	if (!skipExpiryCheck && new Date(strava.expires) < new Date()) {
		await refreshTokensAndUpdateDB(strava.refreshToken)
		syncData({ skipExpiryCheck: true, skip401Refresh })
	}

	try {
		const statsData = await stats(strava.accessToken, strava.userId)
		const existingData = strava.data ? JSON.parse(strava.data) : {}
		updateStravaStats.run(
			JSON.stringify({ ...existingData, stats: statsData }),
			new Date().toISOString(),
		)
	} catch (e) {
		if (!skip401Refresh && e instanceof HTTPNotOkError && e.response.status === 401) {
			await refreshTokensAndUpdateDB(strava.refreshToken)
			syncData({ skipExpiryCheck: true, skip401Refresh: true })
		} else {
			throw e
		}
	}
}

const updateStravaTokens = db.prepare(
	'UPDATE strava SET accessToken = ?, refreshToken = ?, expires = ? WHERE id=1',
)

const refreshTokensAndUpdateDB = async (refreshToken: string) => {
	try {
		const refreshed = await tokenFromRefresh(refreshToken)
		updateStravaTokens.run(
			aesCbcEncrypt(refreshed.access_token),
			aesCbcEncrypt(refreshed.refresh_token),
			new Date(refreshed.expires_at * 1000).toISOString(),
		)
	} catch (e) {
		if (e instanceof HTTPNotOkError && e.response.status === 401) {
			updateStravaTokens.run(null, null, null)
		}
		throw e
	}
}
