import { v4 as uuidv4 } from 'uuid'
import type { RequestHandler } from './$types'
import { upload } from '$lib/server/s3'
import sharp from 'sharp'
import { error } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.formData()

	const file = body.get('file') as File

	try {
		const ext = file.name.split('.').pop()
		const uid = uuidv4()
		const key = `${uid}.${ext}`
		let image = sharp(Buffer.from(await file.arrayBuffer())).rotate()
		const metadata = await image.metadata()
		const dimensions =
			(metadata.orientation || 0) >= 5
				? { width: metadata.height, height: metadata.width }
				: { width: metadata.width, height: metadata.height }
		if (dimensions.width == null || dimensions.height == null) throw ''
		const imageBuffer = await image.toBuffer()
		await upload({ Bucket: 'prent-eu-central-1', Key: key, Body: imageBuffer })
		return new Response(
			JSON.stringify({
				key,
				width: metadata.width,
				height: metadata.height,
			}),
		)
	} catch {
		throw error(500, 'Something went wrong while uploading to S3')
	}
}
