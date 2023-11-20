<script lang="ts">
	import type { PageData } from './$types'
	import '$lib/prosemirror/prosemirror.css'

	export let data: PageData
</script>

<svelte:head>
	<title>{data.post.title} - Gersom van Ginkel</title>
	<meta name="description" content={data.post.summary} />
</svelte:head>

<div class="m-4 sm:m-8 lg:mt-10">
	<div class="ProseMirror m-auto max-w-lg sm:max-w-xl lg:max-w-2xl">
		{@html data.post.html}
	</div>
</div>
