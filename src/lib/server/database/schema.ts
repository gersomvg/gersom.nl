export interface Image {
	id: number
	filename: string
	width: number
	height: number
	caption: string
	isFeatured: number
	sequence: number
}

export interface Post {
	id: number
	created: string
	slug: string
	summary: string
	draft: string
	content: string
	tags: string
	isPublished: number
	isListed: number
	isFeatured: number
}

export interface Strava {
	id: 1
	updated: string
	userId: number | null
	accessToken: string | null
	refreshToken: string | null
	expires: string | null
	data: string | null
}
