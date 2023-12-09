<script lang="ts">
	import { page } from '$app/stores'

	$: isHome = ['', '/'].includes($page.url.pathname)
</script>

<nav
	class="px-4 pb-10 pt-3 text-sm font-semibold text-gray-900 dark:text-gray-100 xs:text-base sm:px-6"
>
	<div
		class="mx-auto flex items-center"
		class:lg:max-w-7xl={isHome}
		class:max-w-lg={!isHome}
		class:sm:max-w-xl={!isHome}
		class:lg:max-w-2xl={!isHome}
	>
		{#if !isHome}
			<a href="/" class="mr-4">Gersom van Ginkel</a>
		{/if}
		<ul class="ml-auto flex space-x-3 max-xs:text-base xs:space-x-5">
			<li><a href="/posts">Posts</a></li>
			<li><a href="/work">Work</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</div>
</nav>

<slot />
