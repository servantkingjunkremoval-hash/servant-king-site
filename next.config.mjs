/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.wixstatic.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' }
    ]
  },
  async redirects() {
    return [
      // Old Wix-generated URLs can be mapped here when we cut over
    ];
  }
};

export default nextConfig;
