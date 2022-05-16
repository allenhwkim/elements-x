const esbuild = require('esbuild');
const path = require('path');
const WebSocketServer = require('ws').Server;
const wsClients = require('./websocket-clients');
const injectEsbuildResult = require('./inject-esbuild-result');

// returns options for esbuild only from all possible options by excluding keys
function getEsbuildOptions(allOptions) {
  const excludes = `config,preBuilds,postBuilds`.split(',');
  const esbuildOptions = {...allOptions};
  excludes.forEach(key => delete esbuildOptions[key]);
  return esbuildOptions;
}

function longestCommonSubstring(str1, str2) {
  let i = 0;
  while (str1.charAt(i) === str2.charAt(i)) i++;
  return str1.substring(0, i);
}

function runWebSocketServer(port) {
  const wss = new WebSocketServer({port});
  // wss.on('connection', socket => wsClients.push(socket));
  wss.on('connection', socket => {
    wsClients.pop();
    wsClients.push(socket);
  }); // talk only to the last one
  console.info(`[esbuild-x watch-and-reload] websocket server running on ${port}`);
  return wss; 
}

function injectWebSocketClient(port, indexPath, fs) {
  const wsHtml = `\n<script>setTimeout(_ => {` +
      `var ws = new WebSocket('ws://localhost:${port}');` +
      `ws.onmessage = e => { console.log('ws reload requested'); window.location.reload(); }` +
    `}, 1000)</script>`;
  const contents = fs.readFileSync(indexPath, {encoding: 'utf8'})
    .replace(/<\/body>/, `${wsHtml}\n</body>`);
  fs.writeFileSync(indexPath, contents);
} 

module.exports = function runWatchAndReload(watchDir, websocketPort = 9110) {
  // watch file change and broadcast it to web browsers

  return function runWatchAndReload(options, buildResult) { 
    const fs = options.write ? require('fs') : require('memfs');

    /**
     * run websocket server to reload web browsers when file change
     */
    const wss = websocketPort && runWebSocketServer(websocketPort);
    const indexPath = path.join(options.outdir, 'index.html');
    injectWebSocketClient(websocketPort, indexPath, fs); // this injects ws client into index.html

    /**
     * watch file changes and rebuild, copy file, then broadcast to web browsers
     */
    const watcher = require('chokidar').watch(watchDir, {
      ignoreInitial: true, 
      interval: 1000
    });
    watcher.on('all', async (event, filePath) => {
      console.info(`[esbuild-x serve] file ${event} detected in ${filePath}`);

      // rebuild
      const esbuildOptions = getEsbuildOptions(options);
      esbuildOptions.metafile = true;
      const esbuildResult = await esbuild.build(esbuildOptions);
      esbuildResult.outputFiles.forEach(outputFile => {
        console.log('[esbuild-x watch-and-reload]', {outFilePath: outputFile.path});
        fs.writeFileSync(outputFile.path, outputFile.contents);
      });

      // Inject new build .js file into index.html
      const indexPath = injectEsbuildResult()(options, esbuildResult);
      // Inject websocket client to index.html
      injectWebSocketClient(websocketPort, indexPath, fs);

      // When a file changed outside of build process, copy it to dest except index.html.
      // e.g. src/assets/logo.png, src/components/ace.html
      if (!esbuildResult.metafile.inputs[filePath] && !filePath.match(/index\.html$/)) { 
        const contents = require('fs').readFileSync(filePath, {encoding: 'utf8'});

        const commonPath = longestCommonSubstring(filePath, options.outdir);
        const pathRelPath = filePath.replace(commonPath, '');
        const outdirRelPath = options.outdir.replace(commonPath, '');
        const destPath = pathRelPath.replace(/^.*?\//, outdirRelPath + '/');

        const outPath = commonPath + destPath;
        if (fs.existsSync(path.dirname(outPath)) === false) {
          fs.mkdirSync(path.dirname(outPath));
        }

        fs.writeFileSync(commonPath + destPath, contents);
        console.info('[esbuild-x watch-and-reload]', filePath, '>', destPath )
      }
    
      // broadcast to web browsers
      console.log('[esbuild-x watch-and-reload]', 'web socket client length', wsClients.length);
      wsClients.forEach(wsClient => wsClient.send('reload'));
      console.info(`[esbuild-x watch-and-reload] watching changes on ${watchDir}`);
    });

    return {watcher, wss};
  }

}