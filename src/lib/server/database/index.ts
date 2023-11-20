import Database from 'better-sqlite3'
import { migrate } from './migrate'

export const db = new Database('database/database.db')

// Needed for Litestream
db.pragma('journal_mode = WAL')
// Recommended by Litestream
db.pragma('synchronous = NORMAL')

await migrate(db, {
	force: import.meta.env.DEV,
})
