import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Worker } from '../api/Worker';

Meteor.methods({
    registerWorker(name, wallet) {
        check(name, String);
        check(wallet, String);

        // Check if worker logged in already
        if(this.userId) {
            Worker.insert({
                name: name,
                wallet: wallet,
                ownerId: this.userId
            });
        } else {
            throw new Meteor.Error(403, 'Not logged in yet!');
        }
    },

    unregisterWorker(name) {
        check(name, String);
    },

    addWorkerStats(hashrate, shares, denies, temp, fanspeed) {
        check(hashrate, Number);
        check(shares, Number);
        check(denies, Number);
        check(temp, Number);
        check(fanspeed, Number);

        // Do shit
    },

    toggleWorker(id, running) {
        Worker.update(id, { $set: { running } });
    },

    getWorker(id) {
        return Worker.findOne({_id: id});
    },

    createWorker(name, wallet, email) {
        check(name, String);
        check(wallet, String);
        check(email, String);

        if(!this.userId) {
            return Meteor.Error(403, 'Not logged in yet!');
        }

        Worker.insert({
            ownerId: this.userId,
            name,
            wallet,
            email
        });
    },

    updateWorker(id, name, wallet, email) {
        check(id, String);
        check(name, String);
        check(wallet, String);
        check(email, String);

        let worker = Worker.findOne({_id: id});

        if(!worker) {
            return Meteor.Error('no-exists');
        }

        if(!this.userId || worker.ownerId !== this.userId) {
            return Meteor.Error('not-authorised'); 
        }

        Worker.update(id, { $set: { name, wallet, email } });
    },

    deleteWorker(id) {
        check(id, String);

        let worker = Worker.findOne({_id: id});

        if(!this.userId || worker.ownerId !== this.userId) {
            return Meteor.Error('not-authorised'); 
        }

        Worker.remove(id);
    }
})
