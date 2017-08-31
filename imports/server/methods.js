import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Worker from '../api/Worker';

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
    }
})
