/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: "https://api.svetafor.uz",
  },
  images: {
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
