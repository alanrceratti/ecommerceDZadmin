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
				unisansh: ["var(--font-unisansheavy)", ...fontFamily.sans],
				unisansheavy: ["var(--font-unisansheavy)", ...fontFamily.sans],
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			colors: {
				orange: "#FF7A00",
				gray800: "#171717",
				gray500: "#A9A9A9",
				gray400: "#D4D4D4",
				black800: "#0E0E0E",
			},
		},
	},
	plugins: [],
};
