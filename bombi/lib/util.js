const glob = require('glob');
const path = require('path');

// returns options for esbuild only from all possible options by excluding keys
function getEsbuildOptions(allOptions) {
  const excludes = [
    'config',    // config file path
    'port',      // serve port number, default 8080
    'notFoundHandler', // 404 handler
    'preBuilds',       // pre build actions, e.g. clear
    'postBuilds',      // post build actions, e.g. copy, replace, rename, delete
  ];
  const esbuildOptions = {};
  for (var key in allOptions) {
    (excludes.indexOf(key) === -1) && (esbuildOptions[key] = allOptions[key]);
  }
  return esbuildOptions;
}

// delete directory recursively
function rimraf(directoryPath, fs) {
  fs = fs || require('fs');
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file, index) => {
      const curPath = path.join(directoryPath, file);
      fs.lstatSync(curPath).isDirectory() ?
        rimraf(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(directoryPath);
  }
};

// print esbuild results 
function printEsbuildResult(result) {
  result.warnings.forEach(warning => konsole.warn(warning))
  result.errors.forEach(error => konsole.error(error));
  for (var key in result.metafile.outputs) {
    konsole.info('output', key, result.metafile.outputs[key].bytes);
  }
}

// <script> and <link> tags to inject to entry html. e.g. index.html
function getHtmlToInject(esbuildResult) {
  const buildFileNames = esbuildResult.outputFiles ?
    esbuildResult.outputFiles.map(el => el.path) : Object.keys(esbuildResult.metafile.outputs);
  const buildHtml = buildFileNames.map(fileName => {
      const path = '/' + fileName.split('/').slice(-1)[0];
      const ext = path.match(/\.([a-z]+)$/)[1];
      return ext === 'js' ? `    <script src="${path}"></script>` :
            ext === 'css' ? `    <link rel="stylesheet" href="${path}" />` : '';
    }).join('\n');
  
  return buildHtml;
} 

const konsole = {
  LOG_LEVEL: 'info',
  LOG_LEVELS: 
    { all: 0, debug: 1, log: 2, info: 3, warn: 4, error: 5, none: 6 },

  debug: function() { konsole.write('debug', arguments) },
  info: function() { konsole.write('info', arguments) },
  log: function() { konsole.write('log', arguments) },
  warn: function() { konsole.write('warn', arguments) },
  error: function() { konsole.write('error', arguments) },

  setLevel: function(level) { konsole.LOG_LEVEL = level},
  write: function(funcName, args) {
    const restrictedLevel = konsole.LOG_LEVELS[konsole.LOG_LEVEL];
    const requiredLevel = konsole.LOG_LEVELS[funcName];
    if (restrictedLevel <= requiredLevel) {
      console[funcName].apply(console, args);
      return true;
    }
  }
}

// parse cli command and args
function parseShellCommand() {
  const yargs = require('yargs/yargs')
  const { hideBin } = require('yargs/helpers')
  const argv = yargs(hideBin(process.argv)).argv
  const commands =  argv._ || ['build'];
  const args = Object.assign({}, {config:'bombi.config.js'}, argv);
  delete args._;
  delete args.$0;

  return {commands, args};
}

module.exports = {
  getEsbuildOptions, 
  rimraf,
  printEsbuildResult,
  getHtmlToInject,
  konsole,
  parseShellCommand
};