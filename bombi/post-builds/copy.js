const orgfs = require('fs');
const memfs = require('memfs');
const path = require('path');
const glob = require('glob');
const {konsole} = require('../lib/util');

function copyFromTo(from, to, {tofs}) {
  const wildcard = from.indexOf('*') !== -1;
  const pattern = !wildcard && orgfs.lstatSync(from).isDirectory() ? `${from}/**/*` : from;
  const fromDirname = from.match(/\//) ? path.dirname(from.replace(/\/\*.*/, '/wildcard')) : from;
  glob.sync(pattern).forEach(file => {
    const target = file.replace(fromDirname, to);
    const targetDir= path.dirname(target);
    if (!tofs.existsSync(targetDir)) {
      tofs.mkdirSync(targetDir, {recursive: true});
      konsole.debug('creating directory', targetDir);
    } 
    if (orgfs.lstatSync(file).isDirectory()) {
      tofs.mkdirSync(target, {recursive: true});
      konsole.log('[bombi] creating directory', target);
    } else {
      tofs.writeFileSync(target, orgfs.readFileSync(file));
      konsole.log('[bombi] copying files', {from: file, to: target});
    }
  });
}

// copy files or directories to a given directory
module.exports = function copy(fromTos) {
  return function copy(options, esbuildResult) {
    const tofs  = options.write ? orgfs : memfs;
    fromTos = typeof fromTos === 'string' ? [fromTos] : fromTos;
    fromTos.forEach(strExpr => {
      const froms = strExpr.split(' ').slice(0, -1);
      const to = strExpr.split(' ').slice(-1)[0];
      konsole.log({strExpr, froms, to});
      froms.forEach( from => copyFromTo(from, to, {tofs}) );
    })
  }
}