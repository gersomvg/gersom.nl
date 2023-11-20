import { db } from '$lib/server/database'
import type { Post } from '$lib/server/models'
import { DOMSerializer, Fragment } from 'prosemirror-model'
import schema from '$lib/prosemirror/schema'
import { Window } from 'happy-dom'
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load = (async ({ params }) => {
	const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(params.slug) as Post | undefined

	if (!post) {
		throw error(404)
	}

	const doc = new Window().document
	doc.appendChild(doc.createElement('div'))
	DOMSerializer.fromSchema(schema).serializeFragment(
		Fragment.fromJSON(schema, JSON.parse(post.content)),
		{ document: doc as any },
		doc.getElementsByTagName('div')[0] as any,
	)

	return {
		post: {
			slug: post.slug,
			summary: post.summary,
			title: JSON.parse(post.content)[0].content[0].text as string,
			html: doc.getElementsByTagName('div')[0].innerHTML,
		},
	}
}) satisfies PageServerLoad
