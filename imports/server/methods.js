import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Worker, Stats } from '../api';

Meteor.methods({
    addWorkerStats(workerId, data) {
        check(workerId, String);
        check(data, Object);

        const worker = Worker.findOne({_id: workerId});
        
        if(!worker) {
            return Meteor.Error('no-exists');
        }

        if(!this.userId || worker.ownerId !== this.userId) {
            return Meteor.Error('not-authorised'); 
        }

        Stats.insert({
            hashrate: data.hashrate,
            gpus: data.gpus,
            shares: data.shares,
            workerId,
            timestamp: Date.now()
        });

        Worker.update(workerId, { $set: { lastSeen: Date.now() } });
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
