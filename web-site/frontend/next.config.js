/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "http://api.svetafor.uz",
    // API_URL: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["127.0.0.1"],
  },
};

module.exports = nextConfig;
