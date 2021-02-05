/*global require, module, __dirname, process*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/demo'),
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    minimize: true, 
    minimizer: [ new TerserPlugin({extractComments: false}) ]
  },
  resolve: {
    fallback: {
      fs: false,
      path: false
    }
  },
  performance: {
    hints: false,
    // maxEntrypointSize: 1024000,
    // maxAssetSize: 1024000
  },
  plugins: [
    new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: false}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    // new MiniCssExtractPlugin({ linkType: 'text/css', }),
    new MiniCssExtractPlugin({filename: '[name].[chunkhash].css'}),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/assets', to: 'assets' },
        { from: './src/articles', to: 'articles' },
        { from: './src/components', to: 'components' },
        { from: './src/tools', to: 'tools' },
        { from: './src/*.html' },
        { from: './src/_redirects' },
        { from: './robots.txt' }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/typescript']
          }
        }
      },
      { // load as string
        test: [/.css$/, /.html$/],
        exclude: [/index.html/, /style.css$/, /app.css$/, /app.mobile.css$/],
        type: 'asset/source'
      },
      { // output as a file
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name]-[hash][ext][query]'
        }
      },
      { // extract as css file into html for these
        test: [/style.css$/, /app.css$/, /app.mobile.css$/],
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ]
  }
};
