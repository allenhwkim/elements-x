const orgfs = require('fs');
const memfs = require('memfs');
const path = require('path');
const http = require('http');
const { konsole } = require('../lib/util.js');

module.exports = function runStaticServer(options, esbuildResult) {
  const fs = options.write ? orgfs : memfs;

  http.createServer(function (req, res) {
    let filePath = new URL(`file://${req.url}`).pathname;
    filePath = path.join(options.outdir, filePath);
    fs.lstatSync(filePath).isDirectory() && (filePath = path.join(filePath, 'index.html'));

    if (fs.existsSync(filePath)) {
      const contents = fs.readFileSync(filePath);
      res.end(contents);
    } else { // 404
      const foundKey = Object.keys(options.notFoundHandler)
        .find(re => req.url.match(new RegExp(re)));
      if (foundKey) {
        konsole.info('\n[serve]', 404, req.url, '->', options.notFoundHandler[foundKey] );
        const redirPath = path.join(options.outdir, options.notFoundHandler[foundKey]);
        const contents = fs.readFileSync(redirPath, {encoding: 'utf8'});
        res.end(contents);
      } 
    }

  }).listen(options.port);
}