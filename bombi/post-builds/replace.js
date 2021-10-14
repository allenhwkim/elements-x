const orgfs = require('fs');
const memfs = require('memfs');
const glob = require('glob');
const {getHtmlToInject} = require('bombi/lib/util');

function replace(replacements) {
  return function replace(buildOptions, buildResult) {
    const fs = buildOptions.write ? orgfs : memfs;
    replacements.forEach( repl => {
      glob.sync(`${buildOptions.outdir}/${repl.match}`).forEach(file => {
        const contents = fs.readFileSync(file, {encoding: 'utf8'})
          .replace(repl.regex, repl.replace);
        fs.writeFileSync(file, contents);
      });
    })
  };
}

module.exports = replace;