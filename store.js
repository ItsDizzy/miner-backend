'use strict';

class Store {
    constructor() {
        this.workers = [];
    }

    addWorker(data) {
        return new Promise((resolve, reject) => {
            if(this._findWorker(data.name) != -1)
                return reject({ message: `Worker#${data.name} is already registered!` });
            this.workers.push({
                name: data.name
            });
            resolve();
        });
    }

    updateWorker(data) {
        console.log(data);
        return new Promise((resolve, reject) => {
            let index = this._findWorker(data.name);
            if(index == -1)
                return reject({ message: `Worker#${data.name} is not registed yet!` });
            
            //let index = this.workers.findIndex(worker => worker.name == data.name);
            this.workers[index] = data;
            resolve();
        })
    }

    removeWorker(data) {
        return new Promise(resolve => {
            let index = this._findWorker(data.name);
            if(index != -1) {
                this.workers.slice(index, 1);
            }
            resolve();
        });
    }

    _findWorker(name) {
        return this.workers.findIndex(worker => worker.name == name);
    }
}

module.exports = Store;