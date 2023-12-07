import { ajv } from '$lib/ajv'
import type { JSONSchemaType } from '$lib/ajv'
import { db } from '$lib/server/database'
import type { Image } from '$lib/server/database/schema'
import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

type PatchBody = Partial<Pick<Image, 'caption' | 'isFeatured' | 'sequence'>>
const validatePatchBody = ajv.compile({
	type: 'object',
	properties: {
		caption: { type: 'string' },
		isFeatured: { type: 'integer' },
		sequence: { type: 'integer' },
	},
	additionalProperties: false,
} as JSONSchemaType<PatchBody>)

export const PATCH: RequestHandler = async ({ params, request }) => {
	const body = await request.json()
	if (!validatePatchBody(body)) throw error(400)
	const { id } = params

	db.prepare(
		`
		UPDATE images
		SET
			caption = COALESCE(?, caption),
			isFeatured = COALESCE(?, isFeatured)
		WHERE id = ?
	`,
	).run(body.caption, body.isFeatured, id)

	const toSeq = body.sequence
	if (toSeq != null) {
		const imageStatement = db.prepare('SELECT * FROM images WHERE id = ?')
		const countStatement = db.prepare('SELECT COUNT(*) as count FROM images')
		const moveUpSequence = db.prepare(
			'UPDATE images SET sequence = sequence - 1 WHERE sequence > ? AND sequence <= ? AND id != ?',
		)
		const setSequence = db.prepare('UPDATE images SET sequence = ? WHERE id = ?')
		const moveDownSequence = db.prepare(
			'UPDATE images SET sequence = sequence + 1 WHERE sequence >= ? AND sequence < ? AND id != ?',
		)
		db.transaction(() => {
			const image = imageStatement.get(id) as Image
			const { count } = countStatement.get() as { count: number }
			const fromSeq = image.sequence
			const toSeqClamped = Math.max(1, Math.min(count, toSeq))
			if (fromSeq === toSeqClamped) return
			else if (fromSeq < toSeqClamped) moveUpSequence.run(fromSeq, toSeqClamped, id)
			else if (fromSeq > toSeqClamped) moveDownSequence.run(toSeqClamped, fromSeq, id)
			setSequence.run(toSeqClamped, id)
		})()
	}

	return new Response('OK')
}

export const DELETE: RequestHandler = ({ params }) => {
	db.prepare('DELETE FROM images WHERE id = ?').run(params.id)
	return new Response('OK')
}
