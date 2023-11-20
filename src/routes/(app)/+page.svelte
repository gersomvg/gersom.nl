<script lang="ts">
	import type { PageData } from './$types'
	import Gallery from './gallery.svelte'
	import Bio from './bio.svelte'
	import Posts from './posts.svelte'

	export let data: PageData
</script>

<svelte:head>
	<title>Home - Gersom van Ginkel</title>
</svelte:head>
<div class="-mt-4 pb-8 pt-4 sm:p-5 md:p-6 lg:p-7">
	<div
		class="mx-auto max-w-md sm:grid sm:max-w-7xl sm:grid-flow-col sm:grid-cols-12 sm:gap-5 md:gap-6 lg:gap-7"
	>
		<div class="flex items-stretch overflow-hidden sm:col-span-5 sm:row-span-5 lg:col-span-4">
			<Bio />
		</div>
		<div
			class="flex items-stretch max-sm:my-3 max-sm:px-3 sm:col-span-5 sm:row-span-4 sm:row-start-6 lg:col-span-4"
		>
			<Gallery images={data.images} />
		</div>
		<div
			class="flex items-stretch max-sm:my-8 max-sm:px-3 sm:col-span-7 sm:row-span-9 lg:col-span-5"
		>
			<Posts postsPerTag={data.postsPerTag} />
		</div>
	</div>
</div>
