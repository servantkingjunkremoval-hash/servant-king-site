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
      // Wix-era city URLs. The old site published every service area at
      // `/<city>-ca/`; this app serves them at `/service-areas/<city>`. Until now
      // every one of those legacy URLs returned a 404, which meant any external
      // link or stale Google result pointing at them passed nothing through.
      // 301 so the link equity actually transfers.
      {
        source: '/:city([a-z0-9-]+)-ca',
        destination: '/service-areas/:city',
        permanent: true
      },
      // Common Wix page names that no longer exist under those paths.
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-services', destination: '/services', permanent: true },
      { source: '/areas-we-serve', destination: '/service-areas', permanent: true }
    ];
  }
};

export default nextConfig;
