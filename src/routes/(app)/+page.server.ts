import { db } from '$lib/server/database'
import type { Image, Post } from '$lib/server/models'
import type { PageServerLoad } from './$types'

export type ListedPost = Pick<Post, 'id' | 'slug' | 'summary' | 'tags'> & { title: string }
export type PostsPerTag = { [key: string]: ListedPost[] }

function isTagInList(list: string, tag: string) {
	return list.split(',').includes(tag)
}

export const load = (async () => {
	const images = db
		.prepare('SELECT * FROM images WHERE isFeatured = 1 ORDER BY sequence ASC')
		.all() as Image[]
	const posts = db
		.prepare(
			"SELECT id, summary, content ->> '$[0].content[0].text' AS title, slug, tags FROM posts WHERE isPublished = 1 AND isListed = 1 AND isFeatured = 1 ORDER BY created DESC",
		)
		.all() as ListedPost[]

	const postsPerTag: PostsPerTag = {
		all: posts.slice(0, 4),
		other: posts.filter((post) => post.tags === '').slice(0, 4),
		running: posts.filter((post) => isTagInList(post.tags, 'running')).slice(0, 4),
		coding: posts.filter((post) => isTagInList(post.tags, 'coding')).slice(0, 4),
	}

	return { images, postsPerTag }
}) satisfies PageServerLoad
