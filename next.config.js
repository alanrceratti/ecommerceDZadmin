/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		fontLoaders: [
			{ loader: "@next/font/google", options: { subset: ["latin"] } },
		],
	},
	images: {
		domains: ["lh3.googleusercontent.com"],
		formats: ["image/avif", "image/webp"],
	},
};

module.exports = nextConfig;
