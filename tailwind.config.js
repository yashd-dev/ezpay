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
			sans: ["var(--font-inter)"],
			mono: ["var(--font-ibm_mono)"],
		},
		extend: {
			colors: {
				brand: {
					textPrimary: "hsla(0,0%,9%,1)",
					textSecondary: "hsla(0,0%,40%,1)",
					border: "hsla(0,0%,92%,1)",
					borderHover: "hsla(0,0%,79%,1)",
					backgroud: "hsla(0,0%,95%,1)",
					backgroudSecondary: "hsla(0,0%,92%,1)",
					backgroudTertiary: "#292524",
					accent: "#26A269",
					accent2: "hsla(124,60%,75%,1)",
					accent3: "hsla(120,60%,95%,1)",
				},
			},
		},
	},
	plugins: [],
});
