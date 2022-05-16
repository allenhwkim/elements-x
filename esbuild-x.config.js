const glob = require('glob');
const open = require('open');
const rimraf = require('rimraf').sync;
const esbuildX = require('esbuild-x');

const { minifyHtmlPlugin, minifyCssPlugin } = esbuildX.plugins;
const { copy, injectEsbuildResult, runStaticServer, watchAndReload } = esbuildX.postBuilds;

const config = {};
config.build = {
  entryPoints: ['src/main.js'],
  plugins: [minifyCssPlugin, minifyHtmlPlugin],
  preBuilds: [ function clear() {rimraf('dist')} ], 
  postBuilds: [ 
    copy('src/**/!(*.js) public/* dist'),
    injectEsbuildResult(),
  ]
};

config.serve = {
  entryPoints: ['src/main.js'],
  loader: { '.html': 'text', '.css': 'text' },
  postBuilds: [
    copy('src/**/!(*.js) public/* dist'),
    injectEsbuildResult(),
    runStaticServer('dist'),
    watchAndReload(['src', 'lib'], 9110),
    _ => open('http://localhost:9100/')
  ]
};

const entryPoints = glob.sync('lib/*/index.js').reduce( (ret, el) => {
  ret[el.split('/')[1]] = el;
  return ret;
}, {});
entryPoints['ol-marker'] = 'lib/openlayers/x-ol-marker.js';

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
  preBuilds: [ _ => rimraf('dist') ], 
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
