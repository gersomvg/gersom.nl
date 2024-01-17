import { ajv } from '$lib/ajv'
import type { JSONSchemaType } from '$lib/ajv'
import type { RequestHandler } from './$types'
import { error } from '@sveltejs/kit'
import { db } from '$lib/server/database'
import type { Post } from '$lib/server/database/schema'
import { generateCV } from '$lib/server/cv'

const selectPost = db.prepare('SELECT * FROM posts WHERE id = ?')

const updatePost = db.prepare(`
	UPDATE
		posts
	SET
		slug = COALESCE(?, slug),
		summary = COALESCE(?, summary),
		draft = COALESCE(?, draft),
		content = COALESCE(?, content),
		tags = COALESCE(?, tags),
    isPublished = COALESCE(?, isPublished),
    isListed = COALESCE(?, isListed),
    isFeatured = COALESCE(?, isFeatured)
	WHERE
		id = ?
`)

type PatchBody = Partial<
	Pick<
		Post,
		'slug' | 'summary' | 'draft' | 'content' | 'tags' | 'isPublished' | 'isListed' | 'isFeatured'
	>
>

const validatePatchBody = ajv.compile({
	type: 'object',
	properties: {
		slug: { type: 'string' },
		summary: { type: 'string' },
		draft: { type: 'string' },
		content: { type: 'string', nullable: true },
		tags: { type: 'string' },
		isPublished: { type: 'number' },
		isListed: { type: 'number' },
		isFeatured: { type: 'number' },
	},
	additionalProperties: false,
} as JSONSchemaType<PatchBody>)

export const PATCH: RequestHandler = async ({ params, request }) => {
	console.log('PATCH')
	const body = await request.json()
	if (!validatePatchBody(body)) throw error(400)
	const { id } = params
	//const prevPost = selectPost.get(id) as Post
	updatePost.run(
		body.slug,
		body.summary,
		body.draft,
		body.content,
		body.tags,
		body.isPublished,
		body.isListed,
		body.isFeatured,
		id,
	)
	// console.log('saved')
	// console.log(body.slug === 'work' && prevPost.content !== body.content)
	// console.log(body.slug)
	// if (body.slug === 'work' && prevPost.content !== body.content)
	// 	generateCV().catch((e) => {
	// 		console.log('Failed to generate new cv.pdf')
	// 		console.log(e)
	// 	})
	return new Response('OK')
}

const deletePost = db.prepare(`
	DELETE FROM
		posts
	WHERE
		id = ?
`)

export const DELETE: RequestHandler = async ({ params, request }) => {
	const { id } = params
	deletePost.run(id)
	return new Response('OK')
}
