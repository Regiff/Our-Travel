/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "lh3.googleusercontent.com", "files.edgestore.dev"]
  },
  reactStrictMode: true,  // Enable strict mode to catch potential issues
  swcMinify: true,        // Optional: Minifies the code using SWC for faster builds
}
const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname); // Set the alias for `@`
    return config;
  },
};

module.exports = nextConfig;