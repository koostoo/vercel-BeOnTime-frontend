/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    backend: "https://vercel-be-on-time-backend.vercel.app",
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
