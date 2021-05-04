/* eslint-disable @typescript-eslint/no-var-requires */

const { merge } = require('webpack-merge');
const webpackCommonConfig = require('./config.common');

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  devtool: 'eval',
});
