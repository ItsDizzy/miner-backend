import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Worker } from '../api/Worker';

Meteor.publish('Worker.currentWorker', function(workerId) {
    return Worker.find({_id: workerId, ownerId: this.userId});
});

Meteor.publish('Worker.all', function() {
    return Worker.find({ownerId: this.userId});
});