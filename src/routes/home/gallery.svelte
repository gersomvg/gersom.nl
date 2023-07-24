<script lang="ts">
	export let assets: Array<{ filename: string; alt?: string }>
	export let getSrcset: (filename: string, widths: number[]) => string

	const sizes = '(min-width: 640px) 42vw, 100vw'
	const widths = [400, 800, 1200]
</script>

<div class="relative flex-1 rounded-lg pb-[75%]">
	{#each assets as asset, index}
		<img
			{sizes}
			srcset={getSrcset(asset.filename, widths)}
			alt=""
			role="presentation"
			class="absolute top-2 h-full w-full rounded-lg object-cover opacity-70 blur-md md:blur-lg"
			class:hidden={index !== 0}
		/>
		<img
			{sizes}
			srcset={getSrcset(asset.filename, widths)}
			alt={asset.alt}
			class="absolute h-full w-full rounded-lg object-cover"
			class:hidden={index !== 0}
		/>
	{/each}
	<div class="absolute inset-0 rounded-lg border border-black/20 dark:border-white/20" />
</div>
