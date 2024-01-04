/** @type {import('next').NextConfig} */
const nextConfig = {
  //TODO: update config later
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
