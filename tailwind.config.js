/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			gridTemplateRows: {
				9: 'repeat(9, minmax(0, 1fr))',
				10: 'repeat(10, minmax(0, 1fr))',
				11: 'repeat(11, minmax(0, 1fr))',
				12: 'repeat(12, minmax(0, 1fr))',
				13: 'repeat(13, minmax(0, 1fr))',
				14: 'repeat(14, minmax(0, 1fr))',
				15: 'repeat(15, minmax(0, 1fr))',
				16: 'repeat(16, minmax(0, 1fr))',
			},
			gridRow: {
				'span-7': 'span 7 / span 7',
				'span-8': 'span 8 / span 8',
				'span-9': 'span 9 / span 9',
				'span-10': 'span 10 / span 10',
				'span-11': 'span 11 / span 11',
				'span-12': 'span 12 / span 12',
				'span-13': 'span 13 / span 13',
				'span-14': 'span 14 / span 14',
				'span-15': 'span 15 / span 15',
				'span-16': 'span 16 / span 16',
			},
		},
	},
	plugins: [],
}
