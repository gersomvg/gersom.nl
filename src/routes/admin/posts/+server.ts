import type { RequestHandler } from './$types'
import { db } from '$lib/server/database'

const createPost = db.prepare(`
	INSERT INTO
		posts (
      slug,
      summary,
      draft,
      tags,
      isPublished,
      isListed,
      isFeatured
    )
	VALUES
    (
      '',
      '',
      ?,
      '',
      0,
      1,
      1
    )
`)

export const POST: RequestHandler = async ({ params, request }) => {
	const { lastInsertRowid } = createPost.run(
		'[{"type":"title","content":[{"type":"text","text":"Untitled"}]}]',
	)
	return new Response(lastInsertRowid.toString())
}
