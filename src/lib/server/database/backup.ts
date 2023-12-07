import { exec } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { db } from '.'
import { upload } from '../s3'
import { env } from '$env/dynamic/private'

export const backup = async () => {
	await db.backup('/tmp/db-backup')
	await new Promise<void>((resolve, reject) => {
		exec('pigz -f /tmp/db-backup', (error, stdout, stderr) => {
			if (error || stderr) reject()
			else resolve()
		})
	})
	let Key = env.PRODUCTION === 'true' ? 'db-backup' : 'db-backup-dev'
	Key += `/day-${new Date().getDate()}-hour-${new Date().getHours()}.gz`
	await upload({ Bucket: 'gersom.nl-db-backup', Key, Body: await readFile('/tmp/db-backup.gz') })
}
