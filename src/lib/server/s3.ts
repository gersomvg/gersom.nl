import { PutObjectCommand, S3Client, type PutObjectCommandInput } from '@aws-sdk/client-s3'
import { env } from '$env/dynamic/private'

export const s3client = new S3Client({
	credentials: {
		accessKeyId: env.S3_ACCESS_KEY_ID,
		secretAccessKey: env.S3_SECRET_ACCESS_KEY,
	},
	region: 'eu-central-1',
})

export const upload = (input: PutObjectCommandInput) => {
	return s3client.send(new PutObjectCommand(input))
}
