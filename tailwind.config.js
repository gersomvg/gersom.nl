/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			screens: {
				xs: '480px',
			},
			flex: {
				2: '2 2 0%',
				3: '3 3 0%',
				4: '4 4 0%',
				5: '5 5 0%',
				6: '6 6 0%',
				full: '0 1 101% ',
			},
			gridRow: {
				'span-7': 'span 7 / span 7',
				'span-8': 'span 8 / span 8',
				'span-9': 'span 9 / span 9',
			},
			borderRadius: {
				'lg': '0.5rem',
				'lg-px': `calc(0.5rem - 1px)`,
			},
			opacity: {
				3: '0.03',
			},
			colors: {
				gray: {
					75: '#F6F7F9',
					925: '#0A101D',
				},
			},
			spacing: {
				'1f': '0.25em',
				'2f': '0.5em',
				'3f': '0.75em',
				'4f': '1em',
				'5f': '1.25em',
				'6f': '1.5em',
				'7f': '1.75em',
				'8f': '2em',
				'9f': '2.25em',
				'10f': '2.5em',
				'11f': '2.75em',
				'12f': '3em',
			},
		},
	},
	plugins: [],
}
