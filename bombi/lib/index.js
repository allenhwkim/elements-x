#!/usr/bin/env node
const fs = require('fs');
const memfs = require('memfs');
const path = require('path');
const util = require('./util.js');
const dflt = require('./default-options');
const esbuild = require('esbuild');
const { getEsbuildOptions, printEsbuildResult, parseShellCommand, konsole } = util;

const {commands, args} = parseShellCommand();
const command = commands[0];
const configFilePath = path.join(process.cwd(), args.config);
const userConfig = fs.existsSync(configFilePath) && require(configFilePath) || {};
const configJs = userConfig[command] || {};
if (!['build', 'serve'].includes(command) && !userConfig[command]) {
  konsole.error('Error, invalid command')
  return 1;
}

// get options
const defaultOptions = command === 'serve' ? dflt.serve: dflt.build;
const options = Object.assign({}, defaultOptions, configJs, args);

// run pre builds
options.preBuilds.forEach(preBuildFunc => {
  konsole.info('[bombi] pre build', preBuildFunc.name);
  preBuildFunc(options);
});

// run esbuild
const esbuildOptions = getEsbuildOptions(options);
esbuild.build(esbuildOptions).then(esbuildResult => {
  printEsbuildResult(esbuildResult);
  if (!options.write) {
    // need to create a memory directory
    memfs.mkdirSync(path.join(process.cwd(), options.outdir), {recursive: true});
    // write build result to a memory directory
    esbuildResult.outputFiles.forEach(outputFile => {
      memfs.writeFileSync(outputFile.path, outputFile.contents);
    })
  }

  // run post builds
  options.postBuilds.forEach(postBuildFunc => {
    konsole.info('[bombi] post build, ', postBuildFunc.name);
    postBuildFunc(options, esbuildResult);
  });
});
