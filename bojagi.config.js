const glob = require('glob');
const rimraf = require('rimraf').sync;
const { minifyHtmlPlugin, minifyCssPlugin } = require('bojagi/esbuild-plugins');
const { copy, injectEsbuildResult, runStaticServer, watchAndReload } = require('bojagi/post-builds');

const config = {};
config.build = {
  entryPoints: ['src/main.js'],
  plugins: [minifyCssPlugin, minifyHtmlPlugin],
  preBuilds: [ function clear() {rimraf('dist')} ], 
  postBuilds: [ 
    copy('src/**/!(*.js) public/* dist', {
      replacements: [ {match: /index\.html/, find: /BUILD_DATE/, replace:  new Date()} ]
    }),
    injectEsbuildResult(),
  ]
};

config.serve = {
  entryPoints: ['src/main.js'],
  loader: { '.html': 'text', '.css': 'text' },
  postBuilds: [
    copy('src/**/!(*.js) public/* dist', {
      fs: require('memfs'), 
      replacements: [ {match: /index\.html/, find: /BUILD_DATE/, replace:  new Date()} ]
    }),
    injectEsbuildResult(),
    runStaticServer('dist', {
      fs: require('memfs'), 
      port: 9100, 
      notFound: {match: /^\/(component|tool|css)/, serve: 'index.html'}
    }),
    watchAndReload(['src', 'lib'], 9110) 
  ]
};

const entryPoints = glob.sync('lib/*/index.js').reduce( (ret, el) => {
  ret[el.split('/')[1]] = el;
  return ret;
}, {});
entryPoints['ol-marker'] = 'lib/openlayers/x-ol-marker.js';
entryPoints['t9n'] = 'lib/translation/translation-element.js';
entryPoints['t9n-attr'] = 'lib/translation/translation-attr.element.js';

// this is a build for commonjs. e.g. import {XButton} from 'elements-x/button';
config.lib = {
  entryPoints,
  entryNames: '[name]',
  outdir: 'dist',
  bundle: true,
  metafile: true,
  write: true,
  minify: false,
  format: 'esm',
  target: ['es2019'],
  sourcemap: false,
  loader: { '.html': 'text', '.css': 'text' },
  preBuilds: [ _ =>  rimraf('dist') ], 
  postBuilds: [copy('lib/index.js lib/common/util.js dist')],
};

// this is a build for browser-only
config.libmin = {
  entryPoints: ['lib/elements-x.min.js'],
  entryNames: '[name]',
  legalComments: 'none',
  outdir: 'dist',
  bundle: true,
  minify: true,
  metafile: true,
  write: true,
  sourcemap: 'external',
  plugins: [minifyCssPlugin, minifyHtmlPlugin]
};

module.exports = config;
