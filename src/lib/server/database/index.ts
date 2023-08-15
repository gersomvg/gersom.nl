import Database from 'better-sqlite3'
import { migrate } from './migrate'

export const db = new Database('database/database.db')

await migrate(db, {
	force: import.meta.env.DEV,
})
