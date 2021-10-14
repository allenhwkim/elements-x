const WebSocketServer = require('ws').Server;
const wsClients = require('./websocket-clients');

module.exports = function runWebsocketServer(buildResult, options) {
  const wss = new WebSocketServer({ port: options.port + 1});
  wss.on('connection', socket => wsClients.push(socket));
};