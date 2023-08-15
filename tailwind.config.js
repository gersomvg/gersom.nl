/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			gridRow: {
				'span-7': 'span 7 / span 7',
				'span-8': 'span 8 / span 8',
				'span-9': 'span 9 / span 9',
			},
			borderRadius: {
				lg: '0.5rem',
				'lg-px': `calc(0.5rem - 1px)`,
			},
			opacity: {
				3: '0.03',
			},
		},
	},
	plugins: [],
}
