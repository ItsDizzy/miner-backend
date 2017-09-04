import { Mongo } from 'meteor/mongo';
import { Worker } from './Worker';

export const Stats = new Mongo.Collection("workerstats");

// Now let's define some helpers (transforms) that fetch the related documents
Stats.helpers({
  // Join the worker cursor to the stats
  worker: function() {
    return Worker.find({_id: this.workerId})
  }
});