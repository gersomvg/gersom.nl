<script lang="ts">
	import IconsSpriteURL from './assets/icon-sprite/generated/icons.svg?url'
	import type { IconName } from './assets/icon-sprite/generated/icon-names'

	let _class: string = ''
	export let style: string | undefined = undefined
	export { _class as class }
	export let name: IconName
</script>

<svg class={_class} {style}>
	<use href={`${IconsSpriteURL}#${name}`} />
</svg>
