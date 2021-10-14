const {konsole} = require('../lib/util');
const wsClients = require('./websocket-clients');

module.exports = function runWatchAndReload(watchDir) {
  // watch file change and broadcast it to web browsers
  return function runWatchAndReload(esbuildResult, options) { 
    require('chokidar').watch(watchDir, {ignoreInitial: true, interval: 1000})
      .on('all', (event, path) => {
        konsole.info(`[serve] file ${event} detected in ${path}`);
        wsClients.forEach(wsClient => wsClient.send('reload'));
      });
  }
}