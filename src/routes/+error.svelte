<script>
	import { page } from '$app/stores'
</script>

<h1 class="mb-4 text-xl sm:mb-5 sm:text-2xl lg:mb-6 lg:text-3xl">Error {$page.status}</h1>
<p class="mb-3 text-base leading-relaxed sm:mb-4 sm:text-lg lg:mb-5 lg:text-xl">
	{$page.error?.message}
</p>
