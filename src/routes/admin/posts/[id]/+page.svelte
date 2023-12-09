<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { EditorState } from 'prosemirror-state'
	import { EditorView } from 'prosemirror-view'
	import { Fragment, Node } from 'prosemirror-model'
	import { dropCursor } from 'prosemirror-dropcursor'
	import { gapCursor } from 'prosemirror-gapcursor'
	import { keymap } from 'prosemirror-keymap'
	import { history } from 'prosemirror-history'
	import { baseKeymap } from 'prosemirror-commands'
	import codemark from 'prosemirror-codemark'
	import { goto } from '$app/navigation'
	import schema from '$lib/prosemirror/schema'
	import { buildKeymap } from '$lib/prosemirror/keymap'
	import { buildInputRules } from '$lib/prosemirror/inputrules'
	import { hyperlinks } from '$lib/prosemirror/plugins/hyperlink'
	import { images, insertPlaceholder, replacePlaceholder } from '$lib/prosemirror/plugins/images'
	import 'prosemirror-view/style/prosemirror.css'
	import 'prosemirror-gapcursor/style/gapcursor.css'
	import throttle from 'lodash-es/throttle'
	import '$lib/prosemirror/prosemirror.css'
	import type { PageData } from './$types'
	import './codemark.css'

	export let data: PageData

	let element: HTMLDivElement
	let editorState: EditorState
	let editorView: EditorView
	let saving: boolean = false
	let dirty: boolean = false
	let error: boolean = false

	let slug = data.post.slug
	let summary = data.post.summary
	$: draft = editorState ? JSON.stringify(editorState.doc.content.toJSON()) : data.post.draft
	let content = data.post.content
	let tags = data.post.tags
	let isPublished = data.post.isPublished === 1
	let isListed = data.post.isListed === 1
	let isFeatured = data.post.isFeatured === 1

	async function _save() {
		if (saving) return
		const latestDraft = draft
		saving = true
		try {
			const response = await fetch('/admin/posts/' + data.post.id, {
				method: 'PATCH',
				body: JSON.stringify({
					slug,
					summary,
					draft,
					content,
					tags,
					isPublished: isPublished ? 1 : 0,
					isListed: isListed ? 1 : 0,
					isFeatured: isFeatured ? 1 : 0,
				}),
			})
			if (!response.ok) throw new Error()
			error = false
			if (JSON.stringify(editorState.doc.content.toJSON()) === latestDraft) {
				dirty = false
			} else {
				saveThrottled()
			}
		} catch {
			error = true
		} finally {
			saving = false
		}
	}
	const saveThrottled = throttle(_save, 500, { leading: false })
	const save = () => {
		dirty = true
		saveThrottled()
	}
	const saveImmediately = () => {
		save()
		saveThrottled.flush()
	}
	const publish = () => {
		if (window.confirm('Are you sure that you want to publish?')) {
			content = draft
			isPublished = true
			saveImmediately()
		}
	}
	const unpublish = () => {
		if (window.confirm('Are you sure that you want to unpublish?')) {
			isPublished = false
			saveImmediately()
		}
	}
	async function deletePost() {
		if (!window.confirm('Are you sure that you want to delete?')) return
		try {
			const response = await fetch('/admin/posts/' + data.post.id, {
				method: 'DELETE',
			})
			if (response.ok) {
				goto('/admin/posts')
			}
		} catch {
			window.alert("Couldn't delete post")
		}
	}

	const upload = async (event: Event) => {
		event.preventDefault()
		editorView.focus()
		const id = {}
		editorView.dispatch(insertPlaceholder(editorState, id))
		const file = (event.currentTarget as HTMLInputElement)?.files?.[0]
		if (!file) return
		const formData = new FormData()
		formData.append('file', file)
		try {
			const response = await fetch('/admin/image', {
				method: 'POST',
				body: formData,
			})
			const { key, width, height } = await response.json()
			const replacePlaceholderTr = replacePlaceholder(
				editorState,
				id,
				schema.nodes.image.create({ filename: key, width, height }),
			)
			if (replacePlaceholderTr) editorView.dispatch(replacePlaceholderTr)
		} catch {
			const removePlaceholderTr = replacePlaceholder(editorState, id)
			if (removePlaceholderTr) editorView.dispatch(removePlaceholderTr)
		}
	}

	onMount(() => {
		editorState = EditorState.create({
			doc: Node.fromJSON(schema, {
				type: 'doc',
				content: JSON.parse(data.post.draft),
			}),
			plugins: [
				...codemark({ markType: schema.marks.code }),
				buildInputRules(schema),
				keymap(buildKeymap(schema)),
				keymap(baseKeymap),
				dropCursor(),
				gapCursor(),
				history(),
				hyperlinks({ markType: schema.marks.link }),
				images(),
			],
		})

		editorView = new EditorView(
			{ mount: element },
			{
				state: editorState,
				dispatchTransaction(transaction) {
					const oldDoc = JSON.stringify(editorState.doc.toJSON())
					editorState = editorState.apply(transaction)
					//console.log(editorState.toJSON())
					editorView.updateState(editorState)
					if (oldDoc !== JSON.stringify(editorState.doc.toJSON())) save()
				},
			},
		)
	})

	onDestroy(() => {
		if (editorView) {
			editorView.destroy()
		}
	})
</script>

<div class="relative m-4 mt-10 sm:m-8 lg:mt-10">
	<div class="m-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
		<div class="mb-8 rounded bg-gray-100 p-4 text-xs text-gray-900 sm:-mx-1.5">
			<div class="-ml-3 -mt-3 flex flex-wrap items-center">
				<fieldset class="ml-3 mt-3">
					<button
						class="h-8 rounded bg-blue-800 px-2 leading-7 text-white disabled:opacity-50"
						disabled={isPublished && draft === content}
						on:click={publish}
					>
						{isPublished ? 'Sync' : 'Publish'}
					</button>
				</fieldset>
				<fieldset class="ml-3 mt-3">
					{#if isPublished}
						<button
							class="h-8 rounded border border-gray-900 px-2 leading-7 disabled:opacity-50"
							on:click={unpublish}
						>
							Unpublish
						</button>
					{:else}
						<button
							class="h-8 rounded border border-red-800 px-2 leading-7 text-red-800 disabled:opacity-50"
							on:click={deletePost}
						>
							Delete
						</button>
					{/if}
				</fieldset>
				<fieldset class="ml-3 mt-3">
					<label>
						<input
							type="text"
							class="w-20 p-2 text-xs"
							placeholder="Tags"
							bind:value={tags}
							on:input={save}
						/>
					</label>
				</fieldset>
				<fieldset class="ml-3 mt-3">
					<label>
						<input
							type="text"
							class="w-30 p-2 text-xs"
							placeholder="Slug"
							bind:value={slug}
							on:input={save}
						/>
					</label>
				</fieldset>
				<fieldset class="ml-3 mt-3">
					<label class="cursor-pointer">
						<input
							type="checkbox"
							class="mb-0.5 mr-1 align-middle"
							bind:checked={isListed}
							on:change={saveImmediately}
						/>
						Listed
					</label>
				</fieldset>
				<fieldset class="ml-3 mt-3">
					<label class="cursor-pointer">
						<input
							type="checkbox"
							class="mb-0.5 mr-1 align-middle"
							bind:checked={isFeatured}
							on:change={saveImmediately}
						/>
						Featured
					</label>
				</fieldset>
				{#if isPublished}
					<a
						href="/{slug}"
						class="ml-3 mt-3 h-7 rounded border border-gray-300 bg-white px-2 leading-7 text-gray-900"
					>
						🔗
					</a>
				{/if}
				<textarea
					bind:value={summary}
					on:input={save}
					placeholder="Summary"
					class="ml-3 mt-3 h-24 w-full p-3 text-base"
				/>
				<div class="w-full text-right">{summary.length} / 150</div>
			</div>
		</div>
		<div bind:this={element} class="focus:outline-none" />
	</div>
	<label
		class="fixed bottom-4 right-12 h-6 rounded-full border border-white bg-gray-600 px-2 text-xs leading-5 text-white shadow-lg"
	>
		IMG
		<input type="file" accept="image/png, image/jpeg" hidden on:change={upload} />
	</label>
	<div
		class="pointer-events-none fixed bottom-4 right-4 h-6 w-6 rounded-full border border-white bg-green-600 shadow-lg"
		class:animate-pulse={saving}
		class:bg-yellow-400={!error && dirty}
		class:bg-red-700={error}
	/>
</div>
