#!/usr/bin/env node
const esbuild = require('esbuild');
const yargs = require('yargs/yargs')
const argv = yargs().argv
const { copy, injectEsbuildResult, runStaticServer, watchAndReload, readmeToHtml } = require('./post-builds');

const preBuilds = [];

const postBuilds = [
  copy(['src/**/* dist', 'public/* dist']),
  readmeToHtml('README.md', 'dist/readme.html'),
  injectEsbuildResult()
];

const esbuildOptions = {
  entryPoints: ['src/main.js'],
  entryNames: '[name]-[hash]',
  loader: { '.html': 'text', '.css': 'text' },
  outdir: 'dist',
  bundle: true,
  minify: true,
  metafile: true,
  watch: false,
  write: true,
  sourcemap: 'external',
}

// run preBuilds
preBuilds.forEach(preBuildFunc => preBuildFunc(esbuildOptions));

// run esbuild
esbuild.build(esbuildOptions).then(async esbuildResult => {
  // run postBuilds
  postBuilds.forEach(postBuildFunc => postBuildFunc(esbuildOptions, esbuildResult) );
});
