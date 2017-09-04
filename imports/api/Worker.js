import { Mongo } from 'meteor/mongo';
import { Stats } from './Stats';

export const Worker = new Mongo.Collection("workers");

// Now let's define some helpers (transforms) that fetch the related documents
Worker.helpers({
  // Join the stats cursor to the worker
  stats: function(options) {
    return Stats.find({workerId: this._id}, options)
  }
});