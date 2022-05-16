const path = require('path');
const glob = require('glob');
const nodefs = require('fs');

function copyFromTo(from, to, {fs, replacements, excludes}) {
  const wildcard = from.indexOf('*') !== -1;
  const pattern = !wildcard && nodefs.lstatSync(from).isDirectory() ? `${from}/**/*` : from;
  const fromDirname = from.match(/\//) ? path.dirname(from.replace(/\/\*.*/, '/wildcard')) : from;

  glob.sync(pattern).forEach(file => {
    const excluded = excludes.some(exclude => file.match(exclude));
    if (excluded) return;
    
    const target = file.replace(fromDirname, to);
    const targetDir= path.dirname(target);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, {recursive: true});
      // console.debug('creating directory', targetDir);
    } 
    if (nodefs.lstatSync(file).isDirectory()) {
      fs.mkdirSync(target, {recursive: true});
      // console.log('[esbuild-x] creating directory', target);
      console.log('[esbuild-x copy]', {from: file, to: target});
    } else {
      // if match to replace, run replace
      const repls = replacements.filter(repl => repl.match.test(file));
      if (repls.length) {
        let contents = nodefs.readFileSync(file, 'utf8');
        repls.forEach(replacement => {
          contents = contents.replace(replacement.find, replacement.replace);
        });
        fs.writeFileSync(target, contents);
      } else {
        fs.writeFileSync(target, nodefs.readFileSync(file));
      }
      // console.log('[esbuild-x] copying files', {from: file, to: target});
    }
  });
}

// copy files or directories to a given directory
module.exports = function copy(fromTos, {replacements, excludes} = {}) {
  replacements = (replacements || []).concat({
    match: /index\.html/, 
    find: /<head([^>]*)>/, 
    replace: `<head$1><!-- Build at:${new Date()} -->`
  });
  excludes = excludes || [];

  return function copy(options={}, esbuildResult) {
    const fs = options.write ? require('fs') : require('memfs');
    fromTos = typeof fromTos === 'string' ? [fromTos] : fromTos;
    fromTos.forEach(strExpr => {
      const froms = strExpr.split(' ').slice(0, -1);
      const to = strExpr.split(' ').slice(-1)[0];
      console.info(`[esbuild-x copy] ${froms} -> ${to}`);
      froms.forEach( from => {
        if (!from.match(/\*/) && !nodefs.existsSync(from)) { // specified a file, but not exists
          console.log('[esbuild-x copy] not exists', from);
        } else {
          copyFromTo(from, to, {fs, replacements, excludes}) 
        }
      });
    })
  }
}