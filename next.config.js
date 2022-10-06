const fontPaths = [
  '/assets/fonts/sf-pro-display_regular.woff2',
  '/assets/fonts/sf-pro-display_semibold.woff2',
  '/assets/fonts/sf-pro-text_regular.woff2',
  '/assets/fonts/sf-pro-text_semibold.woff2',
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return fontPaths.map((fontPath) => ({
      source: fontPath,
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=16070400',
        },
      ],
    }));
  },
  experimental: { scrollRestoration: true },
};

module.exports = nextConfig;
