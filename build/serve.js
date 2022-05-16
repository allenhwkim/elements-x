#!/usr/bin/env node
const esbuild = require('esbuild');
const yargs = require('yargs/yargs')
const argv = yargs(process.argv.slice(2)).parse();
const kill = require('kill-port');
const { copy, injectEsbuildResult, runStaticServer, watchAndReload, readmeToHtml } = require('./post-builds');

const preBuilds = [];

const postBuilds = [
  copy(['src/**/* dist', 'cypress/reports dist']),
  readmeToHtml('README.md', 'dist/readme.html'),
  injectEsbuildResult(),
  runStaticServer('dist', {
    port: argv.port || 9100,
    notFound: {match: /^\//, serve: 'index.html'},
    open: process.argv.includes('--open')
  }),
  watchAndReload(['src', 'lib'], argv.port ? argv.port + 10 : 9110)
];

const esbuildOptions = {
  entryPoints: ['src/main.js'],
  entryNames: '[name]-[hash]',
  loader: { '.html': 'text', '.css': 'text' },
  outdir: 'dist',
  bundle: true,
  minify: false,
  metafile: true,
  watch: false,
  write: false,
  sourcemap: 'external',
}

// run preBuilds
preBuilds.forEach(preBuildFunc => preBuildFunc(esbuildOptions));

// run esbuild
esbuild.build(esbuildOptions).then(async esbuildResult => {
  await kill(argv.port || 9200) // webserver port
  await kill(9210); // websocket port
  // run postBuilds
  postBuilds.forEach(postBuildFunc => postBuildFunc(esbuildOptions, esbuildResult) );
});
