<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageData } from './$types'

	export let data: PageData

	async function create() {
		try {
			const response = await fetch('/admin/posts/', {
				method: 'POST',
			})
			if (response.ok) {
				goto('/admin/posts/' + (await response.text()))
			}
		} catch {
			window.alert("Couldn't create new post")
		}
	}
</script>

<div class="sm:text-md mx-auto w-full text-base leading-relaxed sm:max-w-7xl lg:text-lg">
	<button
		class="mb-5 ml-3 h-8 rounded bg-blue-800 px-2 text-sm leading-7 text-white disabled:opacity-50"
		on:click={create}
	>
		New Post
	</button>
	<table class="text-gray-900 dark:text-gray-100">
		<thead>
			<th class="w-full px-3 py-2 text-left">Title</th>
			<th class="px-3 py-2 text-left">Created</th>
			<th class="px-3 py-2 text-center">P</th>
			<th class="px-3 py-2 text-center">L</th>
			<th class="px-3 py-2 text-center">F</th>
			<th class="px-3 py-2 text-center">D</th>
		</thead>
		{#each data.posts as post}
			<tr>
				<td class="text-left">
					<a
						href="/admin/posts/{post.id}"
						class="px-3 py-2 font-medium text-blue-800 underline underline-offset-2 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-500"
					>
						{JSON.parse(post.draft)[0].content[0].text}
					</a>
				</td>
				<td class="whitespace-nowrap px-3 py-2 text-left">
					{post.created}
				</td>
				<td class="px-3 py-2 text-center">
					{post.isPublished ? '✅' : '❌'}
				</td>
				<td class="px-3 py-2 text-center">
					{post.isListed ? '✅' : '❌'}
				</td>
				<td class="px-3 py-2 text-center">
					{post.isFeatured ? '✅' : '❌'}
				</td>
				<td class="px-3 py-2 text-center">
					{post.content === post.draft ? '' : '✍️'}
				</td>
			</tr>
		{/each}
	</table>
</div>
