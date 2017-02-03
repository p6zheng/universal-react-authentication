var webpack = require('webpack');
var path = require('path');
//var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'hidden-source-map',
  entry: {
    app: [
      './client/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'redux'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: 'css-loader!sass-loader'
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: 'css-loader'
        })
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin("style.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ]
}