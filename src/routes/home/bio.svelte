<script lang="ts">
	import IconSprite from '$lib/icon-sprite.svelte'

	const today = new Date()
	const day = today.getDate()
	const month = (today.getMonth() + 1).toString().padStart(2, '0')
	const year = today.getFullYear()
	const ddmmyyyy = `${day}+${month}+${year}`

	const socials = [
		['Email', 'email', `mailto:website.${ddmmyyyy}@gersom.nl`],
		['Github', 'github', 'https://github.com/gersomvg'],
		['LinkedIn', 'linkedin', 'https://www.linkedin.com/in/gersom/'],
	] as const
</script>

<div class="flex flex-1 flex-col justify-center p-5 sm:p-3 md:p-5">
	<h1
		class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-300 sm:text-xl md:mb-5 md:text-2xl xl:mb-6 xl:text-3xl"
	>
		Gersom van Ginkel
	</h1>
	<p
		class="text-lg leading-relaxed text-gray-900 dark:text-gray-300 sm:text-base md:text-lg xl:text-xl"
	>
		Avid long-distance runner from Amsterdam with a love for mountains, currently on a sabbatical
		from software development, chasing kiwis on the other side of the world.
	</p>
	<div class="-mx-3 mt-4 flex space-x-4 md:mt-5 xl:mt-6">
		{#each socials as [title, name, href]}
			<a
				{href}
				{title}
				aria-label={title}
				target="_blank"
				class="flex items-center justify-center rounded p-3 text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800"
			>
				<IconSprite {name} class="h-8 w-8" />
			</a>
		{/each}
	</div>
</div>
