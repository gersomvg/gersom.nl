<script lang="ts">
	import IconsSpriteURL from './assets/icon-sprite/generated/icons.svg?url'
	import type { IconName } from './assets/icon-sprite/generated/icon-names'

	let _class: string = ''
	export { _class as class }
	export let name: IconName
</script>

<svg class={_class}>
	<use href={`${IconsSpriteURL}#${name}`} />
</svg>
