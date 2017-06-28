'use strict';

const Store = require('./store');
const SocketServer = require('./socket');

let config = {};
try {
  config = require('./config.json');
} catch(err) {
  throw new Error("No config file was found!");
}

let store = new Store();
let socketServer = new SocketServer(config, store);

socketServer.start();