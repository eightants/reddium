module.exports = {
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
};
