const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				unisansheavy: ["var(--font-unisansheavy)", ...fontFamily.sans],
				unisansitalic: [
					"var(--font-unisansitalic)",
					...fontFamily.sans,
				],
				unisansthin: ["var(--font-unisansthin)", ...fontFamily.sans],
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			colors: {
				orange: "#FF7A00",
				gray400: "#D4D4D4",
				gray500: "#A9A9A9",
				gray900: "#171717",
				gray950: "#0E0E0E",
				black800: "#0E0E0E",
			},
		},
	},
	plugins: [],
};
