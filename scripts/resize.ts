import { parseArgs } from 'node:util'
import path from 'node:path'
import fs from 'node:fs/promises'
import sharp from 'sharp'

const { values } = parseArgs({
	args: process.argv,
	options: {
		file: {
			type: 'string',
		},
	},
	allowPositionals: true,
})

const relativePath = values.file as string
const filename = path.basename(relativePath)

const imagePath = path.resolve(process.cwd(), relativePath)

const outDir = path.resolve(imagePath, '..', 'output')
try {
	await fs.stat(outDir)
} catch (error) {
	if (error.code === 'ENOENT') await fs.mkdir(outDir)
}

let image = sharp(imagePath).rotate()

const originalOutputPath = path.resolve(outDir, filename)
await fs.writeFile(originalOutputPath, await image.toBuffer())

image = image.png({ quality: 90 }).jpeg({ mozjpeg: true, quality: 90 })

for (const width of [200, 400, 600, 800, 1000, 1200, 1400, 1600, 2000, 2400, 2800]) {
	const newFilename = filename.replace(/\.(?=[^.]*$)/, `.${width}.`)

	await fs.writeFile(
		path.resolve(outDir, newFilename),
		await image.resize({ width, withoutEnlargement: true }).toBuffer(),
	)
}
