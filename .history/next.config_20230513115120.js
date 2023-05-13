/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    appDir: true,
    fontLoaders: [
      { loader: "@next"}
    ]
  }
}

module.exports = nextConfig
