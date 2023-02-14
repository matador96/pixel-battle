const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const assetFilename = '[name].[contenthash][ext][query]';

const DEV_SERVER_BACKEND_API = 'localhost:3040';
const PROD_SERVER_BACKEND_API = 'rocketeers.ru';

module.exports = (env, argv) => ({
  entry: './src/index.js',
  target: 'web',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: '/',
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].chunk.js',
  },
  performance: {
    maxAssetSize: 1024000,
    maxEntrypointSize: 2048000,
    hints: false,
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      favicon: 'public/favicon.ico',
      filename: 'index.html',
      template: 'public/index.html',
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        argv.mode === 'production' ? PROD_SERVER_BACKEND_API : DEV_SERVER_BACKEND_API,
      ),
    }),
    new Dotenv(),
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    https: false,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'build'),
    },
    port: 3000,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  stats: {
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        generator: {
          filename: `fonts/${assetFilename}`,
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
});
