const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin')
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



const prodConfig = {
  mode: 'production',
  output: {
    publicPath:'/',
    path: path.resolve('./dist/client'),
    filename: 'bingo-spider-[name]-[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.(css|postcss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
        sideEffects: true
      },
      {
        test: /\.(less)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bingo-spider-[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './build/template/index.ejs',
      favicon: './build/template/favicon.ico',
      env: process.env.NODE_ENV
    }),
    // pwa 支持
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true, // 让浏览器立即 servece worker 被接管
      skipWaiting: true,  // 更新 sw 文件后，立即插队到最前面
      include: [/\.js$/, /\.css$/, /\.ico$/],
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports:true,
    splitChunks: {
      chunks: 'all',
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     name: 'vendors'
      //   }
      // }
    },
    minimizer: [new TerserPlugin({
      terserOptions: {    //Terser 压缩配置
        output: { comments: false }
      },
      extractComments: true,    //将注释剥离到单独的文件中
    })]
  },
  externals: {
    'react-dom': 'ReactDOM',
  },
  cache:{
    type: 'filesystem',
    // 缓存时间
    maxAge: 5184000000,
  }
};

module.exports = merge(baseConfig, prodConfig);
