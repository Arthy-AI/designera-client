/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['cdn.designera.app', 'placekitten.com', 'cdn.discordapp.com'],
    },
}

module.exports = nextConfig
