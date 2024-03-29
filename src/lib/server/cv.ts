import { env } from '$env/dynamic/private'
import fs from 'node:fs'
import puppeteer from 'puppeteer'

export const generateCV = async () => {
	const browser = await puppeteer.launch({ headless: 'new' })
	const cvURL = 'http://' + (env.HOST || 'localhost') + ':' + (env.PORT || '3000') + '/admin/cv'
	const page = await browser.newPage()
	await page.setCookie({ name: 'token', value: env.ADMIN_TOKEN, domain: 'localhost' })
	await page.goto(cvURL, { waitUntil: ['domcontentloaded'] })
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
