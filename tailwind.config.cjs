/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'slide-up': 'slide-up 300ms ease-in 1 forwards',
				'slide-up-always-visible': 'slide-up-always-visible 600ms ease 1 forwards'
			},
			keyframes: {
				'slide-up': {
					from: { transform: 'translateY(12px)', opacity: 0 },
					to: { transform: 'translateY(0)', opacity: 1 }
				},
				'slide-up-always-visible': {
					from: { transform: 'translateY(100%)' },
					to: { transform: 'translateY(0)' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
