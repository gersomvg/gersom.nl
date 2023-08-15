<script lang="ts">
	import { initUIDGenerator } from '$lib/uid-store'

	const categories = ['All', 'Coding', 'Running', 'Other']

	const uid = initUIDGenerator()
	const tabIds = categories.map((_, idx) => uid('tab' + idx))
	const tabpanelIds = categories.map((_, idx) => uid('tabpanel' + idx))

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
		{#each categories as category, idx}
			<button
				class="flex-auto border-b border-black/10 bg-clip-padding px-px text-center text-sm font-semibold text-gray-500 first:rounded-tl-lg-px first:pl-0 last:rounded-tr-lg-px last:pr-0 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 aria-selected:border-x aria-selected:border-b-0 aria-selected:bg-gray-500/3 aria-selected:px-0 aria-selected:pb-px aria-selected:text-gray-900 aria-selected:underline aria-selected:first:border-l-0 aria-selected:last:border-r-0 dark:border-white/10 dark:text-gray-400 dark:aria-selected:bg-gray-500/5 dark:aria-selected:text-gray-300 xl:text-base"
				role="tab"
				aria-selected={isSelected(category)}
				aria-controls={tabpanelIds[idx]}
				id={tabIds[idx]}
				tabindex={isSelected(category) ? 0 : -1}
				on:click={() => (selected = category)}
				on:keydown={(e) => onTabKeydown(e)}
			>
				<span class="mx-2 my-4 inline-block [text-decoration:inherit]">{category}</span>
			</button>
		{/each}
	</div>
	{#each categories as category, idx}
		<div
			id={tabpanelIds[idx]}
			role="tabpanel"
			aria-labelledby={tabIds[idx]}
			class="flex-1 bg-gray-500/3 dark:bg-gray-500/5"
			hidden={!isSelected(category)}
		/>
	{/each}
</div>
