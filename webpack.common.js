require('dotenv').config();
const path = require('path');
const DIST_DIR = path.join(__dirname, '/client/dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
   require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

let apiHost;

let setupAPI = function () {
   if (process.env.NODE_ENV === 'production') {
      apiHost = JSON.stringify('http://localhost:8080');
   } else if (process.env.NODE_ENV === 'development') {
      apiHost = JSON.stringify('/api');
   }
};

setupAPI();

module.exports = {
   entry: `${path.join(__dirname, '/client/src')}/index.jsx`,
   output: {
      filename: 'bundle.js',
      path: DIST_DIR,
      publicPath: '/',
   },
   module: {
      rules: [
         {
            //enables webpack to handle jsx files
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },
         {
            test: /.s?css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
         },
         {
            //enables webpack to handle images
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         title: 'Frontend Capstone',
         template: 'template.html',
      }),
      new MiniCssExtractPlugin(),
      new webpack.DefinePlugin({
         __API__: apiHost,
      }),
      // new FriendlyErrorsWebpackPlugin(),
      //! uncomment this line to visualize webpack bundles in browser
      // new BundleAnalyzerPlugin(),
   ],
};
