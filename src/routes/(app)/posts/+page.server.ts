import { db } from '$lib/server/database'
import type { Post } from '$lib/server/models'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export type ListedPost = Pick<Post, 'id' | 'slug' | 'summary' | 'tags' | 'created'> & {
	title: string
}
export type PostsPerTag = { [key: string]: ListedPost[] }

function isTagInList(list: string, tag: string) {
	return list.split(',').includes(tag)
}

export const load = (async ({ request }) => {
	// request.url is used instead of using url.searchParams, to prevent dependency tracking from
	// reloading this function whenever the user presses on one of the tag tabs
	const tag = new URLSearchParams(request.url.split('?').pop()).get('tag') || 'all'

	if (!['all', 'coding', 'running', 'other'].includes(tag)) {
		throw error(404)
	}

	const posts = db
		.prepare(
			"SELECT id, summary, content ->> '$[0].content[0].text' AS title, slug, tags, created FROM posts WHERE isPublished = 1 AND isListed = 1 AND isFeatured = 1 ORDER BY created DESC",
		)
		.all() as ListedPost[]

	const postsPerTag: PostsPerTag = {
		all: posts,
		other: posts.filter((post) => post.tags === ''),
		running: posts.filter((post) => isTagInList(post.tags, 'running')),
		coding: posts.filter((post) => isTagInList(post.tags, 'coding')),
	}

	return { postsPerTag, tag: tag?.toLowerCase() || 'all' }
}) satisfies PageServerLoad
