import { db } from '$lib/server/database'
import type { Image } from '$lib/server/models'
import type { PageServerLoad } from './$types'

export const load = (async () => {
	const images = db.prepare('SELECT * FROM images ORDER BY sequence ASC').all() as Image[]
	return { images }
}) satisfies PageServerLoad
