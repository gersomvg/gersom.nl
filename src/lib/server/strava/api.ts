import { env } from '$env/dynamic/private'
import { HTTPNotOkError } from '$lib/fetch'

export const tokenFromCode = async (code: string) => {
	const formData = new FormData()
	formData.append('client_id', env.STRAVA_CLIENT_ID)
	formData.append('client_secret', env.STRAVA_CLIENT_SECRET)
	formData.append('code', code)
	formData.append('grant_type', 'authorization_code')
	const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
		method: 'POST',
		body: formData,
		headers: {
			accept: 'application/json',
		},
	})
	if (!response.ok) throw new HTTPNotOkError(response)
	const json = (await response.json()) as {
		athlete: { id: number }
		access_token: string
		refresh_token: string
		expires_at: number
	}
	return json
}

export const tokenFromRefresh = async (refreshToken: string) => {
	const formData = new FormData()
	formData.append('client_id', env.STRAVA_CLIENT_ID)
	formData.append('client_secret', env.STRAVA_CLIENT_SECRET)
	formData.append('refresh_token', refreshToken)
	formData.append('grant_type', 'refresh_token')
	const response = await fetch('https://www.strava.com/api/v3/oauth/token', {
		method: 'POST',
		body: formData,
		headers: {
			accept: 'application/json',
		},
	})
	if (!response.ok) throw new HTTPNotOkError(response)
	const json = (await response.json()) as {
		access_token: string
		refresh_token: string
		expires_at: number
	}
	return json
}

export const stats = async (accessToken: string, userId: number) => {
	const response = await fetch(`https://www.strava.com/api/v3/athletes/${userId}/stats`, {
		headers: {
			accept: 'application/json',
			authorization: 'Bearer ' + accessToken,
		},
	})
	if (!response.ok) throw new HTTPNotOkError(response)
	return (await response.json()) as StravaStats
}

type StravaStatsTotals = {
	count: number | null
	distance: number | null
	moving_time: number | null
	elapsed_time: number | null
	elevation_gain: number | null
}

type StravaStatsTotalsWithAchievements = StravaStatsTotals & { achievement_count: number | null }

export type StravaStats = {
	biggest_ride_distance: number | null
	biggest_climb_elevation_gain: number | null
	recent_ride_totals: StravaStatsTotalsWithAchievements
	recent_run_totals: StravaStatsTotalsWithAchievements
	recent_swim_totals: StravaStatsTotalsWithAchievements
	ytd_ride_totals: StravaStatsTotals
	ytd_run_totals: StravaStatsTotals
	ytd_swim_totals: StravaStatsTotals
	all_ride_totals: StravaStatsTotals
	all_run_totals: StravaStatsTotals
	all_swim_totals: StravaStatsTotals
}
