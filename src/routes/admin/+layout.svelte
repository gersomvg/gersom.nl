<script>
	import { enhance } from '$app/forms'
</script>

<div class="m-5 flex flex-wrap items-center justify-center space-x-4">
	<a
		href="/"
		target="_blank"
		class="text-lg font-semibold text-blue-800 underline dark:text-blue-300"
	>
		<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
			<path
				d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
			/>
		</svg>
	</a>
	<a href="/admin/posts" class="text-lg font-semibold text-blue-800 underline dark:text-blue-300">
		Posts
	</a>
	<a href="/admin/gallery" class="text-lg font-semibold text-blue-800 underline dark:text-blue-300">
		Gallery
	</a>
	<a href="/admin/strava" class="text-lg font-semibold text-blue-800 underline dark:text-blue-300">
		Strava
	</a>
	<form method="post" action="/auth?/logout" use:enhance>
		<button
			type="submit"
			class="inline text-lg font-semibold text-blue-800 underline dark:text-blue-300"
		>
			Logout
		</button>
	</form>
</div>

<svelte:head>
	<title>ADMIN - Gersom.nl</title>
</svelte:head>

<div class="m-2 sm:m-5">
	<slot />
</div>
