<script lang="ts">
	import { debounce } from '@github/mini-throttle'
	import { getSrcset } from '$lib/cdn/images'
	import type { PageData } from './$types'

	export let data: PageData
	let images = data.images

	let draggingIndex: number | null = null
	let draggingOverIndex: number | null = null

	async function reinsert(fromIndex: number, toIndex: number) {
		const withoutFrom = images.filter((_, index) => index !== fromIndex)
		const image = images[fromIndex]
		images = withoutFrom
			.slice(0, toIndex)
			.concat(images[fromIndex])
			.concat(withoutFrom.slice(toIndex))
			.map((image, index) => {
				image.sequence = index + 1
				return image
			})
		await fetch('/admin/gallery/' + image.id, {
			method: 'PATCH',
			body: JSON.stringify({ sequence: image.sequence }),
		})
	}

	async function changeCaption(value: string, index: number) {
		const { id } = images[index]
		await fetch('/admin/gallery/' + id, {
			method: 'PATCH',
			body: JSON.stringify({ caption: value }),
		})
	}
	const changeCaptionDebounced = debounce(changeCaption, 300)

	async function toggleFeatured(index: number) {
		const { id } = images[index]
		const newValue = Number(!images[index].isFeatured)
		images[index].isFeatured = newValue
		await fetch('/admin/gallery/' + id, {
			method: 'PATCH',
			body: JSON.stringify({ isFeatured: newValue }),
		})
	}

	async function remove(index: number) {
		const { id } = images.splice(index, 1)[0]
		images = images
		await fetch('/admin/gallery/' + id, {
			method: 'DELETE',
		})
	}

	function onDrop(event: DragEvent) {
		if (event.target != null && event.target instanceof HTMLElement) {
			const fromIndex = Number(event.dataTransfer?.getData('text'))
			const toIndex = Number(event.target.dataset.index)
			reinsert(fromIndex, toIndex)
		}
	}
</script>

<div class="-mb-10 flex flex-wrap justify-between">
	{#each images as image, index}
		<div class="mb-10">
			<img
				sizes={'400w'}
				srcset={getSrcset(image.filename, [400, 800])}
				alt={image.caption}
				class="mb-2 h-[300px] w-[400px] rounded object-cover ring-gray-500 ring-offset-4 transition"
				class:opacity-50={draggingIndex === index}
				class:scale-90={draggingIndex === index}
				class:ring={draggingOverIndex === index && draggingOverIndex !== draggingIndex}
				draggable="true"
				data-index={index}
				on:dragstart={(e) => {
					draggingIndex = index
					e.dataTransfer?.setData('text', '' + index)
				}}
				on:dragend={() => ((draggingIndex = null), (draggingOverIndex = null))}
				on:dragenter={() => (draggingOverIndex = index)}
				on:dragleave={() => (draggingOverIndex = null)}
				on:dragover={(e) => e.preventDefault()}
				on:drop={onDrop}
			/>
			<div class="mb-2 flex space-x-2">
				<button
					class="h-12 w-12 rounded bg-gray-200"
					on:click={() => reinsert(index, index - 1)}
					hidden={index === 0}
				>
					<svg
						class="m-auto h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 5H1m0 0 4 4M1 5l4-4"
						/>
					</svg>
				</button>
				<button
					class="h-12 w-12 rounded bg-gray-200"
					on:click={() => reinsert(index, index + 1)}
					hidden={index === images.length - 1}
				>
					<svg
						class="m-auto h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 10"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 5h12m0 0L9 1m4 4L9 9"
						/>
					</svg>
				</button>
				<button class="h-12 w-12 rounded bg-gray-200" on:click={() => toggleFeatured(index)}>
					{#if image.isFeatured}
						<svg
							class="m-auto h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 22 20"
						>
							<path
								d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
							/>
						</svg>
					{:else}
						<svg
							class="m-auto h-5 w-5"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 21 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
							/>
						</svg>
					{/if}
				</button>
				<div class="flex-1" />
				<button class="h-12 w-12 rounded bg-gray-200" on:click={() => remove(index)}>
					<svg
						class="m-auto h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 18 20"
					>
						<path
							d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"
						/>
					</svg>
				</button>
			</div>
			<input
				type="text"
				class="w-full rounded border border-gray-300 p-2"
				bind:value={image.caption}
				on:input={(e) => changeCaptionDebounced(e.currentTarget.value, index)}
			/>
		</div>
	{/each}
</div>
