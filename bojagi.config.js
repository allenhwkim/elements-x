const glob = require('glob');
const { rimraf } = require('bojagi/lib/util');

const { 
  minifyHtmlPlugin, 
  minifyCssPlugin 
} = require('bojagi/esbuild-plugins');
const {
  copy, 
  injectBuild, 
  replace, 
  runWebsocketServer, 
  runStaticServer, 
  watchAndReload
} = require('bojagi/post-builds');

const config = {};
config.build = {
  entryPoints: ['src/main.js'],
  plugins: [minifyCssPlugin, minifyHtmlPlugin],
  preBuilds: [ function clear() {rimraf('dist')} ], 
  postBuilds: [ 
    copy('src/assets src/components src/tools src/*.html src/*.css public/* dist'),
    injectBuild,
    replace([{match: 'index.html', regex: /BUILD_DATE/, replace: new Date()}]),
  ]
};

config.serve = {
  entryPoints: ['src/main.js'],
  loader: { '.html': 'text', '.css': 'text' },
  notFoundHandler: {
    '^/(component|tool)': 'index.html'
  },
  // 
  postBuilds: [
    copy('src/assets src/components src/tools src/translations src/*.html src/*.css public/* dist'),
    injectBuild,
    replace([{match: 'index.html', regex: /BUILD_DATE/, replace: new Date()}]),
    runStaticServer,
    runWebsocketServer,
    watchAndReload(['src', 'lib'])
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
  plugins: [minifyCssPlugin, minifyHtmlPlugin]
};

module.exports = config;
