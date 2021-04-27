const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve('./dist/client'),
    filename: '[name].js',
  },
  devServer: {
    hot: true,
    // 代理服务器端域名
    proxy: {
      '/': 'http://175.27.130.159:3000/',
    },
    port:3001
  },
  module: {
    rules: [
      {
        test: /\.(css|postcss)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './build/template/index.ejs',
      favicon: './build/template/favicon.ico',
      env: process.env.NODE_ENV,
    }),
    // 模块热替换插件
    // new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = merge(baseConfig, devConfig);
