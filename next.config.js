/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'lh3.googleusercontent.com', 'picsum.photos'],
  }
}

module.exports = nextConfig
