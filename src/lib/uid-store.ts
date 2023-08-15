import { setContext, getContext } from 'svelte'
import { readable, type Readable, get } from 'svelte/store'
import context from './context'

type GetCount = () => number
type UIDStore = Readable<GetCount>

export function initUIDStore() {
	let count = 0
	const uidStore: UIDStore = readable(() => ++count)
	setContext(context.uid, uidStore)
}

export function initUIDGenerator() {
	const uidStore = getContext<UIDStore>(context.uid)
	let getCount: GetCount
	if (!uidStore) {
		console.warn(`You haven't called initUIDStore() in the root page component.`)
		getCount = () => Math.round(Math.random() * Math.pow(10, 10))
	} else {
		getCount = get(uidStore)
	}
	return (prefix: string) => `${prefix}_${getCount()}`
}
