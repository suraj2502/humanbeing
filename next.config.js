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
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
