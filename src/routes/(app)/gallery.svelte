<script lang="ts">
	import { getSrcset } from '$lib/cdn/images'
	import IconSprite from '$lib/icon-sprite.svelte'
	import type { Image } from '$lib/server/database/schema'

	export let images: Image[]

	let activeIndex = 0

	function slideDistance(idx1: number, idx2: number, length: number): number {
		const betweenDist = Math.abs(idx1 - idx2)
		const loopDist = length - Math.abs(idx1 - idx2)
		return Math.min(betweenDist, loopDist)
	}
</script>

<section
	aria-label="Photos taken from or by Gersom"
	aria-roledescription="carousel"
	class="group/a relative flex-1 rounded-lg pb-[75%]"
>
	{#each images as image, index}
		<section aria-label={image.caption} aria-roledescription="slide">
			<img
				sizes={'(min-width: 1024px) 33vw, (min-width: 640px) 42vw, 100vw'}
				srcset={slideDistance(activeIndex, index, images.length) <= 1
					? getSrcset(image.filename)
					: undefined}
				alt={image.caption}
				class="absolute h-full w-full rounded-lg object-cover duration-500"
				class:opacity-0={index !== activeIndex}
				class:z-10={index === activeIndex}
				class:transition={index === activeIndex}
				aria-hidden={index !== activeIndex}
			/>
		</section>
	{/each}
	{#each ['l', 'r'] as pos}
		<button
			on:click={() =>
				(activeIndex = (activeIndex + images.length + (pos === 'l' ? -1 : +1)) % images.length)}
			class="group/b absolute z-20 h-full w-1/3 text-white focus:outline-none"
			class:rotate-180={pos === 'r'}
			class:right-0={pos === 'r'}
			aria-label={pos === 'l' ? 'Previous' : 'Next'}
		>
			<div
				class="flex h-full w-full rounded-l-lg bg-gradient-to-r from-black/20 to-black/0 opacity-0 transition group-hover/b:opacity-100 group-focus-visible/b:opacity-100"
			>
				<IconSprite
					name="chevron-left"
					class="ml-4 h-full w-4 self-center justify-self-start opacity-40 drop-shadow transition group-hover/a:group-hover/b:opacity-100 group-hover/a:opacity-60 group-focus-visible/b:opacity-100"
				/>
			</div>
		</button>
	{/each}
	<div
		class="pointer-events-none absolute inset-0 z-20 rounded-lg border border-black/20 dark:border-white/20"
	/>
</section>
