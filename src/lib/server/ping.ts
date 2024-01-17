import { env } from '$env/dynamic/private'

const checks = {
	stravaSync: 'https://hc-ping.com/065054a2-0044-4485-a614-8a7a2ec1596b',
	sqliteBackup: 'https://hc-ping.com/7c2484b0-af64-46f9-99e9-1aadc9226345',
	test: 'https://hc-ping.com/32a08201-a68d-43b6-ab76-837b9c587685',
} as const

export function ping(
	check: keyof typeof checks,
	signal: 'start' | 'success' | 'fail' | 'log' = 'success',
	{ throwError = false, onlyProduction = true, body = undefined as undefined | string } = {},
) {
	if (onlyProduction && env.PRODUCTION !== 'true') return

	const _signal = signal === 'success' ? '' : '/' + signal
	fetch(checks[check] + _signal, { method: body ? 'POST' : 'GET', body }).catch((error) => {
		if (throwError) throw error
	})
}
