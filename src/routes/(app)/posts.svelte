<script lang="ts">
	import IconSprite from '$lib/icon-sprite.svelte'
	import { initUIDGenerator } from '$lib/uid-store'
	import type { PostsPerTag } from './+page.server'

	export let postsPerTag: PostsPerTag

	const tags = ['All', 'Coding', 'Running', 'Other']

	const uid = initUIDGenerator()
	const tabIds = tags.map((_, idx) => uid('tab' + idx))
	const tabpanelIds = tags.map((_, idx) => uid('tabpanel' + idx))

	let tablist: HTMLDivElement | undefined

	let selected = 'All'
	$: isSelected = (category: string) => category === selected

	function onTabKeydown(e: KeyboardEvent) {
		if (tablist == null || e.target == null) return
		const childNodes = tablist.childNodes as NodeListOf<HTMLButtonElement>
		const targetIndex = Array.from(childNodes).findIndex((node) => node === e.target)
		if (e.key === 'ArrowLeft') {
			childNodes.item((targetIndex - 1 + childNodes.length) % childNodes.length).focus()
		} else if (e.key === 'ArrowRight') {
			childNodes.item((targetIndex + 1) % childNodes.length).focus()
		}
	}
</script>

<div class="flex flex-1 flex-col rounded-lg border border-black/10 dark:border-white/10">
	<div class="flex flex-wrap" role="tablist" aria-label="Post categories" bind:this={tablist}>
		{#each tags as tag, idx}
			<button
				class="z-0 flex-auto border-b border-black/10 bg-clip-padding px-px text-center text-sm font-semibold text-gray-500 first:rounded-tl-lg-px first:pl-0 last:rounded-tr-lg-px last:pr-0 focus:outline-none focus-visible:z-10 focus-visible:ring focus-visible:ring-gray-500 aria-selected:border-x aria-selected:border-b-0 aria-selected:bg-gray-75 aria-selected:px-0 aria-selected:pb-px aria-selected:text-gray-900 aria-selected:underline aria-selected:first:border-l-0 aria-selected:last:border-r-0 dark:border-white/10 dark:text-gray-400 dark:aria-selected:bg-gray-925 dark:aria-selected:text-gray-300 xl:text-base"
				role="tab"
				aria-selected={isSelected(tag)}
				aria-controls={tabpanelIds[idx]}
				id={tabIds[idx]}
				tabindex={isSelected(tag) ? 0 : -1}
				on:click={() => (selected = tag)}
				on:keydown={(e) => onTabKeydown(e)}
			>
				<span class="mx-2 my-4 inline-block [text-decoration:inherit]">{tag}</span>
			</button>
		{/each}
	</div>
	{#each tags as tag, idx}
		<div
			id={tabpanelIds[idx]}
			role="tabpanel"
			aria-labelledby={tabIds[idx]}
			class="relative flex-1 rounded-bl-lg-px rounded-br-lg-px bg-gray-75 dark:bg-gray-925"
			hidden={!isSelected(tag)}
		>
			<ul class="overflow-hidden sm:absolute sm:inset-0">
				{#each postsPerTag[tag.toLowerCase()] as post, index}
					<li>
						<a
							href="/{post.slug}"
							class="mx-3 block border-b border-black/10 px-2 py-4 text-gray-900 dark:border-white/10 dark:text-gray-300 md:py-5"
							class:border-b={index + 1 < postsPerTag[tag.toLowerCase()].length}
						>
							<span class="block font-bold md:text-lg">
								{post.title}
							</span>
							<span class="mt-3 block leading-relaxed opacity-75 md:text-lg">
								{post.summary}
							</span>
						</a>
					</li>
				{/each}
			</ul>
			<div class="pointer-events-none relative bottom-0 left-0 h-16 w-full sm:absolute sm:h-32">
				<div
					class="pointer-events-auto absolute bottom-0 left-0 hidden h-1/2 w-full rounded-bl-lg-px rounded-br-lg-px bg-gray-75 dark:bg-gray-925 sm:block"
				/>
				<div
					class="absolute bottom-1/2 left-0 right-0 top-0 bg-gradient-to-t from-gray-75 to-gray-75/0 dark:from-gray-925 dark:to-gray-925/0"
				/>
				<a
					href="/posts?tag={tag.toLowerCase()}"
					class="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap p-3 font-semibold text-gray-900 hover:opacity-70 dark:text-gray-300 sm:top-3/4"
				>
					{'More Posts '}
					<IconSprite name="arrow-right" class="mb-px ml-2 inline-block h-4 w-4" />
				</a>
			</div>
		</div>
	{/each}
</div>
