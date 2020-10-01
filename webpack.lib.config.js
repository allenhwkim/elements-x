const path = require('path');
const glob = require('glob');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const entries = {index: './lib/index.js'};
glob.sync('lib/**/*/index.js').forEach( path => {
  const key = path.replace('lib/','').replace('/index.js', '');
  entries[key] = './' + path;
});

// console.log(entries);

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js"
  },
  // optimization: {
  //   minimize: true, 
  //   minimizer: [new TerserPlugin()] 
  // },
  node: {
    fs: 'empty'
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512384,
    maxAssetSize: 512384
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  resolve: { extensions: [".js", ".ts"] },
  module: {
    rules: [
      {
        test: [/.js$|.ts$/],
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/typescript"]
          }
        }
      },
      { // load as text file under lib/*/*.css
        test: [/.css$|.html$/],
        use: ['raw-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      }
    ]
  }
};
