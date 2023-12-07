import { db } from '$lib/server/database'
import type { Image, Post, Strava } from '$lib/server/database/schema'
import type { StravaStats } from '$lib/server/strava/api'
import type { PageServerLoad } from './$types'

export type ListedPost = Pick<Post, 'id' | 'slug' | 'summary' | 'tags'> & { title: string }
export type PostsPerTag = { [key: string]: ListedPost[] }

function isTagInList(list: string, tag: string) {
	return list.split(',').includes(tag)
}

const selectImages = db.prepare('SELECT * FROM images WHERE isFeatured=1 ORDER BY sequence ASC')
const selectPosts = db.prepare(
	"SELECT id, summary, content ->> '$[0].content[0].text' AS title, slug, tags FROM posts WHERE isPublished = 1 AND isListed = 1 AND isFeatured = 1 ORDER BY created DESC",
)
const selectStravaData = db.prepare('SELECT data FROM strava WHERE id=1')

export const load = (async () => {
	const images = selectImages.all() as Image[]
	const posts = selectPosts.all() as ListedPost[]
	const strava = selectStravaData.get() as Strava
	const stravaData = strava.data ? (JSON.parse(strava.data) as { stats?: StravaStats }) : null

	const postsPerTag: PostsPerTag = {
		all: posts.slice(0, 5),
		other: posts.filter((post) => post.tags === '').slice(0, 5),
		running: posts.filter((post) => isTagInList(post.tags, 'running')).slice(0, 5),
		coding: posts.filter((post) => isTagInList(post.tags, 'coding')).slice(0, 5),
	}

	return { images, postsPerTag, strava: stravaData }
}) satisfies PageServerLoad
