/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['cdn.designera.app'],
    },
}

module.exports = nextConfig
