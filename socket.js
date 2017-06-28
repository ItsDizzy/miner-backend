'use strict';

const logger = require('log4js').getLogger('socket');
const Server = require('socket.io');

class SocketServer {
    constructor(config, store) {
        this.config = config;
        this.store = store;
        this.io = null;
    }

    start() {
        if(this.io) return logger.warn("Socket.IO server was already started!");

        // NOTICE: Bind me to express later ples!
        this.io = new Server(this.config.socket.port, {
            serveClient: false
        })
        logger.info("Socket.IO was successfuly started, i think...");

        this.io.on('error', err => {
            this.logger.error(err);
        })

        this._createNamespaces();
    }

    _createNamespaces() {
        this.io.of('/worker').on('connection', (socket) => {
            logger.info(`Socket#${socket.id} - connected`);
            this._initWorkerSocket(socket);
        })
    }

    _initDefaultSocket(socket) {
        socket.on('disconnect', () => {
            logger.info(`Socket#${socket.id} - disconnected`);
        });
    }

    _initWorkerSocket(socket) {
        socket.on('error', err => {
            logger.error(err);
        });

        socket.on('identify', worker => {
            if(!worker.key || worker.key != this.config.socket.secret)
                return this._killSocket(socket, "Invalid secret!");
            
            this.store.addWorker(worker).then(() => {
                logger.info(`Socket#${socket.id} - identified, starting data listener...`);
                socket.emit('identified');

                socket.on('data', data => {
                    this.store.updateWorker(data).then(() => {
                        logger.info(`Socket#${socket.id} - updated data`);    
                    }).catch(err => {
                        this._killSocket(socket, err.message);
                    });
                });

                socket.on('disconnect', () => {
                    logger.info(`Socket#${socket.id} - disconnected`);
                    this.store.removeWorker(worker);
                });
            }).catch(err => {
                this._killSocket(socket, err.message);
            })
        })
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