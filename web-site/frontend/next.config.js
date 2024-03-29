/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_URL: "https://svetaforuz-production.up.railway.app",
    // API_URL: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["127.0.0.1", "svetaforuz-production.up.railway.app"],
  },
};

module.exports = nextConfig;
