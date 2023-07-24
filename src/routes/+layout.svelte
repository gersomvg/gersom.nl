<script>
	import '../app.css'
	import IconsSpriteURL from '$lib/assets/icon-sprite/generated/icons.svg?url'
</script>

<svelte:head>
	<link rel="preload" href={IconsSpriteURL} as="image" type="image/svg+xml" />
</svelte:head>
<slot />
