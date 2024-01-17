import { env } from '$env/dynamic/private'
import fs from 'node:fs'
import puppeteer from 'puppeteer'
import { ping } from './ping'

export const generateCV = async () => {
	console.warn('loading puppeteer...')
	ping('test', 'success', { body: 'loading puppeteer...' })
	const browser = await puppeteer.launch({ headless: 'new' })

	const cvURL = 'http://' + (env.HOST || 'localhost') + ':' + (env.PORT || '3000') + '/admin/cv'
	ping('test', 'success', { body: cvURL })
	const cvHTML = await (
		await fetch(cvURL, {
			credentials: 'include',
			headers: { Cookie: 'token=' + env.ADMIN_TOKEN },
		})
	).text()
	ping('test', 'success', { body: cvHTML })

	const page = await browser.newPage()
	await page.setContent(cvHTML, { waitUntil: ['domcontentloaded'] })
	await page.evaluateHandle('document.fonts.ready')

	const dir = env.PRODUCTION === 'true' ? '/var/lib/data/' : 'temp/'

	const pdf = await page.createPDFStream({
		format: 'A4',
		scale: 0.86,
		margin: { top: 60, bottom: 60, left: 50, right: 50 },
		printBackground: true,
	})
	const writeStream = fs.createWriteStream(dir + 'cv.pdf')
	pdf.pipe(writeStream, { end: true })
	writeStream.on('close', async () => {
		await browser.close()
	})
	writeStream.on('error', (error) => {
		throw error
	})
}
