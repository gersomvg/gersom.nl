<script lang="ts">
	import type { PageData } from './$types'
	import '$lib/prosemirror/prosemirror.css'

	export let data: PageData

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
	const date = new Date(data.post.created)
	const formattedDate = `${date.getDate()} ${monthLabels[date.getMonth()]} ${date.getFullYear()}`
</script>

<svelte:head>
	<title>{data.post.title} - Gersom van Ginkel</title>
	<meta name="description" content={data.post.summary} />
	{#if !data.post.isListed}<meta name="robots" content="noindex" />{/if}
</svelte:head>

<div class="m-4 pb-8 sm:m-8 lg:mt-10">
	<div class="ProseMirror m-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
		{#if data.post.isListed}
			<div class="-mt-2f mb-4f text-center text-sm font-medium opacity-60">
				{formattedDate}
			</div>
		{/if}
		{@html data.post.html}
	</div>
</div>
