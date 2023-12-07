import { db } from '$lib/server/database'
import type { Post } from '$lib/server/database/schema'
import type { PageServerLoad } from './$types'

export const load = (async () => {
	const posts = db.prepare('SELECT * FROM posts ORDER BY created DESC').all() as Post[]
	return { posts }
}) satisfies PageServerLoad
