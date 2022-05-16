const minify = require('html-minifier').minify;
const fs = require('fs');
const path = require('path');

const minifyHtmlPlugin = {
  name: 'minify-html',
  setup(build) {
    build.onResolve({ filter: /\.html$/ }, args => {
      // {path, importer, namespace, resolveDir, kind, pluginData} = args
      return { 
        path: path.join(args.resolveDir, args.path),
        namespace: 'minify-html'
      };
    });

    // onLoad() return the contents of the module and to tell esbuild how to interpret it.
    build.onLoad({ filter: /.*/, namespace: 'minify-html' }, async args => {
      const fileContents = await fs.promises.readFile(args.path, 'utf8');
      const contents = minify(fileContents, {
        minifyCSS: true,
        minifyJs: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      });

      // {path, namespace, pluginData} = argsff
      return { 
        contents,
        loader: 'text'
      }
    })
  },
}

module.exports = minifyHtmlPlugin;