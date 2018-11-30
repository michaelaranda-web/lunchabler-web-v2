const webpack = require('webpack');
const path = require('path');
const APP_DIR = path.resolve(__dirname, 'client');
const BUILD_DIR = path.resolve(__dirname, 'dist');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: APP_DIR + '/js/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: BUILD_DIR,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react', 'es2015']
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: devMode 
          ? ['style-loader', 'css-loader', 'sass-loader'] 
          : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      DEVELOPMENT: devMode
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};