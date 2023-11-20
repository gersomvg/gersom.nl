<script>
	import { initUIDStore } from '$lib/uid-store'
	import './app.css'

	initUIDStore()
</script>

<slot />

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply bg-gray-50 antialiased dark:bg-gray-950;
	}
</style>
