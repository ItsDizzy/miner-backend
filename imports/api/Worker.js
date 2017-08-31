import { Mongo } from 'meteor/mongo';

export const Worker = new Mongo.Collection("workers");

/*{
    _id,
    wallet,
    name,
    running,
    lastSeen
}*/