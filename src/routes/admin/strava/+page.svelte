<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import type { ActionData, PageData } from './$types'

	export let data: PageData
	export let form: ActionData

	function printExpired(expires: string | null) {
		if (!expires) return null
		const date = new Date(expires)
		let text = date.toLocaleString()
		if (date < new Date()) text += ` (❌)`
		else text += ` (✅)`
		return text
	}
</script>

<div class="relative pb-10 text-gray-900 dark:text-gray-100">
	<div class="m-auto max-w-lg space-y-5 p-2 sm:max-w-xl sm:p-5 lg:max-w-2xl">
		<p>
			<a
				href="https://www.strava.com/oauth/authorize?client_id=117687&redirect_uri={$page.url
					.origin}/admin/strava/&response_type=code&scope=activity:read&approval_prompt=auto"
				class="font-medium text-blue-500 underline"
			>
				Authorize
			</a>
			<span class="font-bold text-green-500" hidden={data.state !== 'success'}>(success)</span>
			<span class="font-bold text-red-500" hidden={data.state !== 'error'}>(error)</span>
		</p>
		<form action="?/sync" method="post" use:enhance>
			<button type="submit" class="font-medium text-blue-500 underline">Sync</button>
			{#if form?.syncMessage}
				<br />
				<span class="text-red-500">{form.syncMessage}</span>
			{/if}
			{#if form?.syncOk}
				<span class="text-green-500">Success!</span>
			{/if}
		</form>
		<pre>User ID: {data.strava.userId}</pre>
		<pre>Access token: {data.strava.accessToken}<br />Refresh token: {data.strava.refreshToken}<br
			/>Expires: {printExpired(data.strava.expires)}</pre>
		<pre>Updated: {new Date(data.strava.updated).toLocaleString()}</pre>
		<pre>{data.strava.data && JSON.stringify(JSON.parse(data.strava.data), null, 2)}</pre>
	</div>
</div>
