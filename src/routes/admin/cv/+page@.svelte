<script lang="ts">
	import type { PageData } from './$types'
	import '$lib/prosemirror/prosemirror.css'

	export let data: PageData
</script>

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
</style>
