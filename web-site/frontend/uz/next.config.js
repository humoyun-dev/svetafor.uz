/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
