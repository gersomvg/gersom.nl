<script lang="ts">
	import type { PageData } from './$types'
	import Gallery from './gallery.svelte'
	import Bio from './bio.svelte'
	import Posts from './posts.svelte'
	import Strava from './strava.svelte'

	export let data: PageData
</script>

<svelte:head>
	<title>Home - Gersom van Ginkel</title>
</svelte:head>
<div class="-mt-4 mb-8 pt-4 sm:p-5 md:p-6 lg:p-7">
	<div
		class="mx-auto max-w-md grid-flow-col auto-rows-max grid-cols-10 sm:grid sm:max-w-7xl sm:gap-5 md:grid-cols-9 md:gap-6 lg:grid-cols-12 lg:gap-7"
	>
		<div
			class="col-span-5 row-span-1 flex min-w-0 flex-col space-y-5 max-sm:px-3 md:col-span-4 md:space-y-6 lg:space-y-7"
		>
			<Bio />
			<Gallery images={data.images} />
		</div>
		<div class="col-span-5 row-span-2 flex min-w-0 flex-col max-sm:my-5 max-sm:px-3 lg:row-span-1">
			<Posts postsPerTag={data.postsPerTag} />
		</div>
		<div
			class="col-span-5 row-span-1 flex min-w-0 items-start max-lg:col-start-1 max-lg:row-start-2 max-sm:px-3 md:col-span-4 md:col-start-1 lg:col-span-3"
		>
			<Strava data={data.strava} />
		</div>
	</div>
</div>
