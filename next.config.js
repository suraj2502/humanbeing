/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kettocdn.gumlet.io",
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: "https",
        hostname: "cimages.milaap.org",
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
