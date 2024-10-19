/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ["a.thumbs.redditmedia.com"],
  },
  publicRuntimeConfig: Object.keys(process.env).reduce((config, key) => {
    if (key.startsWith('REDDIUM_')) {
      config[key] = process.env[key];
    }
    return config;
  }, {}),
  eslint: {
    dirs: ['pages', 'components', 'lib', 'src'], // specify directories to lint
    ignoreDuringBuilds: false, // or true if you want to ignore ESLint errors during builds
  },
};

module.exports = nextConfig;
