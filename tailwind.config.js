/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Open Sans", "sans-serif"],
		},
		extend: {
			colors: {
				brand: {
					base: "#EFEDEA",
					surface: "#292524",
					accent: "#26A269",
				},
			},
		},
	},
	plugins: [],
});
