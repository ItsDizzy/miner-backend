import { Meteor } from 'meteor/meteor';
import { getLogger } from 'log4js';
import Crypto from 'crypto';
import Server from 'socket.io';
import Store from './Store';

import { Workers } from '../../imports/api/Workers.js';
import { Stats } from '../../imports/api/Stats.js';

const logger = getLogger('socket');

class SocketServer {
    constructor(config) {
        this.config = config;
        this.store = new Store();
        this.io = null;
    }

    start() {
        if(this.io) return console.warn("Socket.IO server was already started!");

        // NOTICE: Bind me to express later ples!
        this.io = new Server(1337, {
            serveClient: false
        })
        console.info("Socket.IO was successfuly started, i think...");

        this.io.on('error', err => {
            this.logger.error(err);
        })

        this._createNamespaces();
    }

    _createNamespaces() {
        let workerns = this.io.of('/worker')
            .use(Meteor.bindEnvironment((socket, next) => {
                console.info(`Socket#${socket.id} - handshake`)
                let secret = socket.handshake.query.secret;
                console.log(socket.handshake.query);
                if(secret == "arandomkey...") {
                    return next();
                }
                return next(new Error('not-authorized'));
            }))
            .on('connection', Meteor.bindEnvironment((socket) => {
                console.info(`Socket#${socket.id} - connected`);
                this._initDefaultSocket(socket);
                this._initWorkerSocket(socket);
            }));

        setInterval(Meteor.bindEnvironment(() => {
            let workers = Object.keys(workerns.sockets).length;
            if(workers > 0) { 
                console.info(`Sending heartbeat to ${Object.keys(workerns.sockets).length} sockets`);
                workerns.emit('heartbeat', {
                    secret: Crypto.randomBytes(48).toString('base64')
                });
            }
        }), 5000);
    }

    _initDefaultSocket(socket) {
        socket.on('disconnect', Meteor.bindEnvironment(() => {
            console.info(`Socket#${socket.id} - disconnected`);
        }));

        socket.on('error', Meteor.bindEnvironment(err => {
            logger.error(err);
        }));
    }

    _initWorkerSocket(socket) {
        //socket.on('identify', Meteor.bindEnvironment(data => {
        
        socket.errors = [];

        socket.on('m-error', Meteor.bindEnvironment(data => {
            socket.errors.push(data);
            console.error(`Socket#${socket.id} - error, error count ${socket.errors.length}`);
        }));

        socket.on('m-stats', Meteor.bindEnvironment(stats => {
            console.info(`Socket#${socket.id} - stats, adding stats`);
            this._createWorker(socket.handshake.query, Meteor.bindEnvironment((err, _id) => {
                if(err) throw err;

                let [ hashrate, shares, denies ] = stats.eth.split(';');
                let [ temp, fanspeed ] = stats.temps.split(';');

                Stats.insert({
                    worker: _id,            // worker lookup id
                    uptime: stats.uptime,   // worker uptime
                    hashrate: hashrate,     // worker hasrate
                    shares: shares,         // worker shares
                    denies: denies,         // worker denies
                    temp: temp,             // worker gpu temp
                    fanspeed: fanspeed,     // worker gpu fanspeed
                    last_seen: new Date()   // NOTICE: update worker for this!
                });
            }));
        }));
        //}));
    }

    _createWorker(data, cb) {
        let worker = Workers.findOne({
            wallet: data.wallet,
            name: data.name
        });

        if(worker) {
            cb(null, worker);
        } else {
            cb(null, Workers.insert({
                wallet: data.wallet,
                name: data.name
            }));
        }
    }

    _killSocket(socket, message) {
        socket.emit('error', {
            message: message
        });
        socket.disconnect();
        logger.error(`Socket#${socket.id} - killed, reason: ${message}`);
    }
}

module.exports = SocketServer;