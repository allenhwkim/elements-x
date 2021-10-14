const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const minifyCssPlugin = {
  name: 'minify-css',
  setup(build) {
    build.onResolve({ filter: /\.css$/ }, args => {
      // {path, importer, namespace, resolveDir, kind, pluginData} = args
      return { 
        path: path.join(args.resolveDir, args.path),
        namespace: 'minify-css'
        // errors?: Message[];
        // external?: boolean;
        // path?: string;
        // pluginData?: any;
        // pluginName?: string;
        // warnings?: Message[];
        // watchDirs?: string[];
        // watchFiles?: string[];
      };
    });

    // onLoad() return the contents of the module and to tell esbuild how to interpret it.
    build.onLoad({ filter: /.*/, namespace: 'minify-css' }, async args => {
      // {path, namespace, pluginData} = argsff
      const fileContents = await fs.promises.readFile(args.path, 'utf8');
      const loader = 'text';
      const esbuildResult = await esbuild.build({
        entryPoints: [args.path], 
        minify: true,
        write: false,
      });
      const contents = esbuildResult.outputFiles[0].text;

      return { 
        contents,
        loader,
        // errors?: Message[];
        // pluginData?: any;
        // pluginName?: string;
        // resolveDir?: string;
        // warnings?: Message[];
        // watchDirs?: string[];
        // watchFiles?: string[];
      }
    })
  },
}

module.exports = minifyCssPlugin;