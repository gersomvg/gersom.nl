<script lang="ts">
	import { initUIDGenerator } from '$lib/uid-store'
	import type { PageData } from './$types'

	export let data: PageData

	const description =
		'This is the space where I write about all things software development, my avid trail- and ultra running hobby, or any other random brain dumps.'

	const tags = ['All', 'Coding', 'Running', 'Other']
	const monthLabels = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	]

	const uid = initUIDGenerator()
	const tabIds = tags.map((_, idx) => uid('tab' + idx))
	const tabpanelIds = tags.map((_, idx) => uid('tabpanel' + idx))

	let tablist: HTMLDivElement | undefined

	$: selected = data.tag
	$: isSelected = (category: string) => category.toLowerCase() === selected

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

<svelte:head>
	<title>Posts - Gersom van Ginkel</title>
	<meta name="description" content={description} />
</svelte:head>

<div class="m-4 sm:m-8 lg:mt-10">
	<div class="m-auto max-w-lg text-gray-900 dark:text-gray-100 sm:max-w-xl lg:max-w-2xl">
		<h1 class="mb-4f text-xl font-bold sm:text-2xl lg:text-3xl">Posts</h1>
		<p class="mb-7f sm:text-lg lg:text-xl">
			{description}
		</p>
		<div
			class="mb-1 flex flex-wrap sm:-mx-4"
			role="tablist"
			aria-label="Post categories"
			bind:this={tablist}
		>
			{#each tags as tag, idx}
				<button
					class="flex-auto rounded-t border-b border-black/10 bg-clip-padding px-px py-1 text-center text-sm font-semibold text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 aria-selected:border-x aria-selected:border-b-0 aria-selected:border-t aria-selected:bg-gray-75 aria-selected:px-0 aria-selected:py-0 aria-selected:pb-px aria-selected:text-gray-900 aria-selected:underline dark:border-white/10 dark:text-gray-400 dark:aria-selected:bg-gray-925 dark:aria-selected:text-gray-300 sm:text-base"
					role="tab"
					aria-selected={isSelected(tag)}
					aria-controls={tabpanelIds[idx]}
					id={tabIds[idx]}
					tabindex={isSelected(tag) ? 0 : -1}
					on:click={() => (selected = tag.toLowerCase())}
					on:keydown={(e) => onTabKeydown(e)}
				>
					<span class="mx-2 my-3 inline-block [text-decoration:inherit]">{tag}</span>
				</button>
			{/each}
		</div>
		{#each tags as tag, idx}
			<div
				id={tabpanelIds[idx]}
				role="tabpanel"
				aria-labelledby={tabIds[idx]}
				hidden={!isSelected(tag)}
			>
				<ul>
					{#each data.postsPerTag[tag.toLowerCase()] as post, index}
						<li>
							<a
								href="/{post.slug}"
								class="block border-b border-black/10 py-6f text-gray-900 dark:border-white/10 dark:text-gray-300 sm:text-lg lg:text-xl"
								class:border-b={index + 1 < data.postsPerTag[tag.toLowerCase()].length}
							>
								<span class="block font-bold">
									{post.title}
								</span>
								<span class="mt-3f block leading-relaxed opacity-75">
									{post.summary}
								</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</div>
