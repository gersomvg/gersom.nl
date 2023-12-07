import { db } from '$lib/server/database'
import type { Post } from '$lib/server/database/schema'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
	const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(params.id) as Post
	if (!post) {
		throw error(404)
	}
	return { post }
}) satisfies PageServerLoad
