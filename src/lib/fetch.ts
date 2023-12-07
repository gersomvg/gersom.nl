export class HTTPNotOkError extends Error {
	name: string
	response: Response
	constructor(response: Response) {
		super(`Fetch request failed with status ${response.status}`)
		this.name = 'HTTPNotOkError'
		this.response = response
	}
}
