const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
// const webpack = require('webpack')
const baseConfig = require('./webpack.base.conf')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');

module.exports = merge(baseConfig, {
	mode: 'production',
	optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['window.console.log']
          }
        }
      })
    ],
    runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all'
          }
        }
      }
  },
	plugins: [
    new ManifestPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/prod.env')
    // }),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'src/index.html')
		}),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
	]
})
console.log(process.env.NODE_ENV)
