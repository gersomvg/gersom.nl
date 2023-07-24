<script lang="ts">
	import type { PageData } from './$types'
	import { getSrcset } from '$lib/storyblok'
	import Gallery from './home/gallery.svelte'
	import Bio from './home/bio.svelte'

	export let data: PageData
</script>

<div class="pb-8 pt-4 sm:p-5 md:p-6 lg:p-7">
	<div
		class="mx-auto max-w-md sm:grid sm:max-w-7xl sm:grid-flow-col sm:grid-cols-12 sm:gap-5 md:gap-6 lg:gap-7"
	>
		<div class="flex items-stretch overflow-hidden sm:col-span-5 sm:row-span-5 lg:col-span-4">
			<Bio />
		</div>
		<div
			class="flex items-stretch max-sm:mx-auto max-sm:max-w-md max-sm:px-3 sm:col-span-5 sm:row-span-4 sm:row-start-6 lg:col-span-4"
		>
			<Gallery assets={data.assets} {getSrcset} />
		</div>
		<div class="flex items-stretch bg-slate-600 sm:col-span-7 sm:row-span-9 lg:col-span-5" />
	</div>
</div>

<style lang="postcss">
	:global(html) {
		@apply bg-gray-50 dark:bg-gray-950;
	}
</style>
