import Database from 'better-sqlite3'
import { migrate } from './migrate'
import { building } from '$app/environment'
import { env } from '$env/dynamic/private'

export const db = new Database(
	building
		? ':memory:'
		: env.PRODUCTION === 'true'
		? '/var/lib/data/database.db'
		: 'database/database.db',
)

// Needed for Litestream
db.pragma('journal_mode = WAL')
// Recommended by Litestream
db.pragma('synchronous = NORMAL')

await migrate(db, {
	force: import.meta.env.DEV && env.PRODUCTION !== 'true',
})
