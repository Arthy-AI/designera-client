/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
      domains: ['cdn.designera.app'],  // If you're using images from external domains, list them here
    },
}

module.exports = nextConfig