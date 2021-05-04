/* eslint-disable @typescript-eslint/no-var-requires */

const webpack = require('webpack');
const path = require('path');

const webpackCommonConfig = require('./config.common');
const { merge } = require('webpack-merge');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'hidden-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 전체 새로고침 없이 모든 종류의 모듈들을 런타임 시점에 업데이트 되게 해준다.
  ],
});
