/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["prisma", "@prisma/client"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "cdn.aidhan.*",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "store.aidhan.*",
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "images.aidhan.*",
        port: '',
        pathname: '/cdn-cgi/imagedelivery/Dxsm1yoM7Ap4me0rmkAg9w/**',
      },
    ],
  },
};

module.exports = nextConfig;
