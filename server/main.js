import { Meteor } from 'meteor/meteor';

import SocketServer from './imports/SocketServer.js';


Meteor.startup(() => {
  const socketServer = new SocketServer();
  socketServer.start();
  // code to run on server at startup
});
