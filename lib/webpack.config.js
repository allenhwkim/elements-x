/*global require, module*/
const glob = require('glob');
const TerserPlugin = require('terser-webpack-plugin');
const entries = glob.sync('lib/**/*/index.js').reduce( (acc, el) => {
  const key = el.replace('lib/','').replace('/index.js', '');
  acc[key] = './' + el;
  return acc;
}, {index: './lib/index.js'});

module.exports = {
  entry: entries,
  output: {
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true, 
    minimizer: [new TerserPlugin({extractComments: false})] 
  },
  resolve: {
    fallback: {
      fs: false,
      path: false
    }
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { // load as text file under lib/*/*.css
        test: [/.css$|.html$/],
        type: 'asset/source'
      }
    ]
  }
};
