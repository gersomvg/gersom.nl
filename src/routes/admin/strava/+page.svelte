<script lang="ts">
	import { page } from '$app/stores'
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div class="relative pb-10 text-gray-900 dark:text-gray-100">
	<div class="m-auto max-w-lg p-2 sm:max-w-xl sm:p-5 lg:max-w-2xl">
		<a
			href="https://www.strava.com/oauth/authorize?client_id=117687&redirect_uri={$page.url
				.origin}/admin/strava/&response_type=code&scope=activity:read&approval_prompt=auto"
			class="text-blue-700 underline"
		>
			Authorize
		</a>
		<span class="font-bold text-green-500" hidden={data.state !== 'success'}>(success)</span>
		<span class="font-bold text-red-500" hidden={data.state !== 'error'}>(error)</span>
	</div>
</div>
