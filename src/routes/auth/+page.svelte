<script lang="ts">
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
</script>

<div class="flex min-h-full items-center justify-center text-gray-900">
	<form class="space-y-5 p-5" method="post" action="auth?/login" use:enhance>
		<h1 class="text-xl font-bold dark:text-gray-100">Login</h1>
		<input
			type="text"
			name="name"
			class="block h-10 w-48 rounded-sm border border-blue-100 bg-white px-3 text-gray-900 shadow-inner"
		/>
		<input
			type="password"
			name="password"
			class="block h-10 w-48 rounded-sm border border-blue-100 bg-white px-3 text-gray-900 shadow-inner"
		/>
		<input
			type="submit"
			class="h-8 rounded bg-blue-800 px-3 font-bold text-gray-100"
			class:bg-red-800={$page.status === 401}
		/>
	</form>
</div>

<style lang="postcss">
	:global(html),
	:global(body) {
		@apply h-full;
	}
</style>
