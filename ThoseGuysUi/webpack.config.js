'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const SpritePlugin = require("svg-sprite-loader/plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  node: {
    fs: 'empty'
  },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['public', 'dist'], {
      verbose: true,
      dry: false,
      exclude: []
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.dust',
      inject: 'body',
      filename: 'index.dust',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __ENV__: JSON.stringify("development")
    }),
    //new SpritePlugin(),
    new ExtractTextPlugin("styles.css")
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]")
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract("css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass-loader")
    },
    {
      test: /\.sass$/,
      loader: ExtractTextPlugin.extract("css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]!sass-loader")
    },
    {
      test: /\.(svg|gif|png)$/,
      loader: 'file-loader',
      options: {
        name: "[path][name].[ext]?[hash]"
      }
    }
    ]
  }
};
