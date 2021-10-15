const glob = require('glob');
const open  = require('open');
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
  entryNames: '[name]',
  // 
  postBuilds: [
    copy('src/assets src/components src/tools src/*.html src/*.css public/* dist'),
    injectBuild,
    replace([{match: 'index.html', regex: /BUILD_DATE/, replace: new Date()}]),
    runStaticServer,
    runWebsocketServer,
    watchAndReload(['src', 'lib']),
    function openBrowser() { open(`http://localhost:8080`); }
  ]
};

const entryPoints = glob.sync('lib/*/index.js').reduce( (ret, el) => {
  ret[el.split('/')[1]] = el;
  return ret;
}, {});
// this is for commonjs. e.g. import {XButton} from 'elements-x/button';
config.lib = {
  entryPoints,
  entryNames: '[name]',
  minify: false,
  target: ['es2019'],
  sourcemap: false,
  loader: { '.html': 'text', '.css': 'text' },
  preBuilds: [ _ =>  rimraf('dist') ], 
  postBuilds: [copy('lib/index.js dist')],
};

// this is for browser
config.libmin = {
  entryPoints: ['lib/index.js'],
  entryNames: 'elements-x.min',
  legalComments: 'none',
  plugins: [minifyCssPlugin, minifyHtmlPlugin]
};

module.exports = config;
