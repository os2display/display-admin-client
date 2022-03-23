// eslint-disable-next-line no-unused-vars
module.exports = function override(config, env) {
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    'remote-component.config.js': `${__dirname}/src/remote-component.config.js`,
  };
  config.resolve.fallback = {
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/")
  };

  return config;
};
