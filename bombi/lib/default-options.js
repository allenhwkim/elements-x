const path = require('path');
const { copy, injectBuild, runStaticServer, runWebsocketServer, watchAndReload} = require('../post-builds');

const build = {
  // belows are esbuild options
  entryPoints: [path.join(process.cwd(), 'src', 'main.js')],
  entryNames: '[name]-[hash]',
  outdir: 'dist',
  bundle: true,
  minify: true,
  metafile: true,
  write: true,
  sourcemap: 'external',
  // belows are custom options for build
  postBuilds: []
};

const serve = {
  // belows are esbuild options
  entryPoints: [path.join(process.cwd(), 'src', 'main.js')],
  entryNames: '[name]',
  outdir: 'dist',
  bundle: true,
  minify: false,
  metafile: true,
  watch: true,
  write: false,
  sourcemap: 'external',
  // belows are custom options for serve
  port: 8080,
  notFoundHandler: {
    '^/(component|tool)': 'index.html'
  },
  postBuilds: [
    copy('src/**/* dist'),
    injectBuild,
    runStaticServer,
    runWebsocketServer,
    watchAndReload(['src', 'lib'])
  ]
}

module.exports = {build, serve};