const compose = require('next-compose');

cssConfig = {};
module.exports = compose([
  {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
        },
      });
      return config;
    },
  },
]);
