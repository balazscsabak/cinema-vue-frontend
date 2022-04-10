module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			barlow: ['Barlow', 'sans-serif'],
		},
		container: {
			center: true,
			screens: {
				sm: '100%',
				md: '100%',
				lg: '960px',
				xl: '	1140px',
			},
		},
		extend: {
			colors: {
				'site-1': '#181818',
				'site-2': '#216869',
				'site-3': '#49A078',
				'site-4': '#9CC5A1',
				'site-5': '#DCE1DE',
			},
		},
	},
	plugins: [],
};
