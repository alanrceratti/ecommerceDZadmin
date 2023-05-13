/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				uniSans: ["var(--font-uniSans)", ...fontFamily.sans],
				poppins: ["var(--font-poppins)", ...fontFamily.sans],
			},
			colors: {
				orange: "#FF7A00",
				gray800: "#171717",
				gray500: "#A9A9A9",
        gray300: "#D4D4D4"
				black800: "#0E0E0E",
			},
		},
	},
	plugins: [],
};
