var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    app: './client/index.js',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-router',
      'react-router-dom',
      'react-redux',
      'redux-thunk'
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        }
      },
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
        test: /\.(jpe?g|gif|png|svg|JPE?G|GIF|PNG|SVG)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 }
          },
          'image-webpack-loader'
        ]
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
    new UglifyJSPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor', 'manifest' ],
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'views/index_prod.ejs',
      filename: 'index.ejs'
    })
  ]
};