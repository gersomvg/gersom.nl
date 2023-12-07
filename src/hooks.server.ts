import cron from 'node-cron'
import { redirect, type Handle } from '@sveltejs/kit'
import { env } from '$env/dynamic/private'
import { building } from '$app/environment'
import { syncData } from '$lib/server/strava/sync'
import { db } from '$lib/server/database'
import { backup } from '$lib/server/database/backup'

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAuthenticated = event.cookies.get('token') === env.ADMIN_TOKEN

	if (event.url.pathname.startsWith('/admin') && !event.locals.isAuthenticated) {
		throw redirect(303, '/auth')
	}

	const response = await resolve(event)
	return response
}

if (!building) {
	cron.schedule(
		// “At minute 0 past every hour.”
		'0 */1 * * *',
		async () => {
			try {
				await syncData()
				fetch('https://hc-ping.com/065054a2-0044-4485-a614-8a7a2ec1596b').catch(() => {})
			} catch {
				fetch('https://hc-ping.com/065054a2-0044-4485-a614-8a7a2ec1596b/fail').catch(() => {})
			}
			try {
				await backup()
				fetch('https://hc-ping.com/7c2484b0-af64-46f9-99e9-1aadc9226345').catch(() => {})
			} catch (e) {
				fetch('https://hc-ping.com/7c2484b0-af64-46f9-99e9-1aadc9226345/fail').catch(() => {})
			}
		},
		{ runOnInit: false },
	)
}

process.on('exit', () => db.close())
process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
