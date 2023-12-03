import { env } from '$env/dynamic/private'
import crypto from 'node:crypto'

export function aesCbcEncrypt(text: string) {
	const iv = crypto.randomBytes(16)
	const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(env.CRYPTO_KEY, 'base64'), iv)
	let encrypted = iv.toString('base64')
	encrypted += ':'
	encrypted += cipher.update(text, 'utf-8', 'base64')
	encrypted += cipher.final('base64')
	return encrypted
}

export function aesCbcDecrypt(text: string) {
	const [iv, encrypted] = text.split(':').map((part) => Buffer.from(part, 'base64'))
	const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(env.CRYPTO_KEY, 'base64'), iv)
	let decrypted = decipher.update(encrypted, undefined, 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
