import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Worker from '../api/Worker';

Meteor.publish('Worker.currentWorker', workerId => {
    return Worker.find({_id: workerId, ownerId: this.userId});
});