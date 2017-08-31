import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import WorkerTabs from './WorkerTabs';
import { Worker } from '../../../api/Worker';

class Overview extends Component {
  render() {
    const { match, workers } = this.props;
    const activeWorker = match.params.id;

    console.log(workers.find(worker => worker._id == activeWorker));

    return (
      <div>
        <WorkerTabs activeTab={activeWorker} workers={workers}/>
      </div>
    )
  }
}

export default createContainer(() => {
  Meteor.subscribe('Worker.all');

  return {
      currentUser: Meteor.user(),
      workers: Worker.find({}).fetch()
  };
}, Overview);