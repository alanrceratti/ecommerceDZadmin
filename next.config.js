/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack(config) {
		config.experiments = { ...config.experiments, topLevelAwait: true };
		return config;
	},
	experimental: {
		serverComponentsExternalPackages: ["mongoose"],
		appDir: true,
		fontLoaders: [
			{ loader: "@next/font/google", options: { subset: ["latin"] } },
		],
	},
	images: {
		domains: [
			"lh3.googleusercontent.com",
			"dronezone-admin.s3.amazonaws.com",
		],
		formats: ["image/avif", "image/webp"],
	},
};

module.exports = nextConfig;
