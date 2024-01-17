import fs from 'node:fs'
import path from 'node:path'
import type { RequestHandler } from './$types'
import { createReadableStreamFromReadable } from '$lib/server/stream'
import { env } from '$env/dynamic/private'
import { error } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	const cvPath = path.resolve(env.PRODUCTION === 'true' ? '/var/lib/data/cv.pdf' : './temp/cv.pdf')
	if (fs.existsSync(cvPath)) {
		const fileStream = fs.createReadStream(cvPath)
		const response = new Response(createReadableStreamFromReadable(fileStream))
		response.headers.set('Content-Type', 'application/pdf')
		return response
	} else {
		throw error(404, 'CV not found')
	}
}
