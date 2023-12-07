import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ polyfill: false }),
		alias: {
			'src/banana.ts': 'src/banana.ts',
		},
	},
}

export default config
