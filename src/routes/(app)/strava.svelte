<script lang="ts">
	import IconSprite from '$lib/icon-sprite.svelte'
	import type { PageData } from './$types'

	export let data: PageData['strava']

	function format(distance: number | null) {
		return `${Math.round((distance ?? 0) / 1000).toLocaleString()}`
	}

	const currentYear = new Date().getFullYear()
</script>

<div
	class="min-w-0 flex-1 rounded-lg border border-black/10 p-3 text-sm text-gray-900 dark:border-white/10 dark:text-gray-100"
>
	<p class="text-base font-bold">Running Totals</p>
	{#if data?.stats}
		<div class="-mx-3 overflow-auto">
			<table class="my-5">
				{#each [{ label: '4 Weeks', data: data.stats.recent_run_totals }, { label: currentYear, data: data.stats.ytd_run_totals }, { label: 'Total', data: data.stats.all_run_totals }] as row, index}
					<tr
						data-even={(index + 1) % 2 === 0 || undefined}
						class="data-[even]:bg-orange-600/5 dark:data-[even]:bg-orange-600/10"
					>
						<td class="whitespace-nowrap py-1 pl-3"><b>{row.label}:</b></td>
						<td class="w-full py-1 pr-3 text-right">
							{format(row.data.distance)}<span class="text-xs">km</span>
						</td>
						<td class="whitespace-nowrap py-1 pr-3 text-right">
							{format(row.data.elevation_gain)}<span class="text-xs">km</span>
							<IconSprite name="mountain" class="inline-block h-3 w-3" />
						</td>
					</tr>
				{/each}
			</table>
		</div>
	{:else}
		<p class="py-5 text-center">No data has been synced</p>
	{/if}
	<a href="https://www.strava.com/athletes/gersom" class="mx-auto block w-16">
		<IconSprite name="strava" class="block h-4 w-16" style="color:#FC4C02;" />
	</a>
</div>
