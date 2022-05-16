#!/usr/bin/env node
const esbuild = require('esbuild');
const rimraf = require('rimraf');
const { minifyCssPlugin, minifyHtmlPlugin } = require('./esbuild-plugins');

const preBuilds = [ _ => rimraf.sync('dist') ];
const postBuilds = [];

const esbuildOptions = {
  entryPoints: ['lib/index.js'],
  entryNames: '[name]',
  outdir: 'dist',
  bundle: true,
  format: 'esm',
  legalComments: 'none',
  loader: { '.html': 'text', '.css': 'text' },
  plugins: [ minifyCssPlugin, minifyHtmlPlugin ],
  // minify: true,
  metafile: true,
  write: true,
  sourcemap: 'external', // false
  target: ['es2019']
};

preBuilds.forEach(preBuildFunc => preBuildFunc(esbuildOptions));

esbuild.build(esbuildOptions).then(esbuildResult => {
  postBuilds.forEach(postBuildFunc => postBuildFunc(esbuildOptions, esbuildResult) );
});