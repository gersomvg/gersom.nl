<script lang="ts">
	import type { PageData } from './$types'
	import '$lib/prosemirror/prosemirror.css'

	export let data: PageData
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>
<div class="ProseMirror">
	<div class="flex justify-between">
		<div class="flex flex-col justify-between">
			<h1 class="!m-0 !text-5xl">Gersom van Ginkel</h1>
			<h2 class="!m-0 !text-2xl !font-medium">Freelance Javascript Developer</h2>
		</div>
		<div class="space-y-1 text-right">
			<div><a href="https://gersom.nl">Gersom.nl</a></div>
			<div><a href="tel:+31645237316">+31645237316</a></div>
			<div><a href="mailto:inbox@gersom.nl">inbox@gersom.nl</a></div>
		</div>
	</div>
	<hr />
	{@html data.post.html.split('</h1>', 2)[1]}
</div>

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-white;
	}

	.ProseMirror {
		font-family: 'Inter', sans-serif;
		font-optical-sizing: auto;
	}

	.ProseMirror :global(pre),
	.ProseMirror :global(code) {
		font-family: 'IBM Plex Mono', monospace;
	}
</style>
