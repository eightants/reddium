/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.thumbs.redditmedia.com', 'b.thumbs.redditmedia.com'],
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
  },
  publicRuntimeConfig: {
    // Set defaults
    REDDIUM_DISABLE_ABOUT: true,
    REDDIUM_DISABLE_KOFI_LINK: true,
    // Overwrite with any REDDIUM_ environment variables
    ...Object.fromEntries(
      Object.entries(process.env)
        .filter(([key]) => key.startsWith('REDDIUM_'))
    ),
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src'],
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;
