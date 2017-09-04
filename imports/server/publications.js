import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Worker, Stats } from '../api';

Meteor.publish('Worker.currentWorker', function(workerId) {
    return Worker.find({_id: workerId, ownerId: this.userId});
});

Meteor.publish('Stats.top', function() {
    return Stats.find({}, {sort: { timestamp: -1 }, limit: 20});
});

Meteor.publishComposite('Worker.allWithLastStats', function() {
  return {
    find: function() {
      return Worker.find({ownerId: this.userId});
    },
    children: [
      {
        find: function(worker) {
          return Stats.find({workerId: worker._id}, {sort: { timestamp: -1 }, limit: 1});
        }
      }
    ]
  };
});

Meteor.publish('Worker.all', function() {
    return Worker.find({ownerId: this.userId});
});