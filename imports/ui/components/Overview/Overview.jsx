import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import windowSize from 'react-window-size';

import { Table, Button } from 'reactstrap';

import WorkerTabs from './WorkerTabs';
import HashChart from './HashChart';
import { Worker } from '../../../api/Worker';

class Overview extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.workers.length != this.props.workers.length) {
      return true;
    }

    if(nextProps.currentWorker != this.props.currentWorker) {
      return true;
    }

    if(nextProps.match != this.props.match) {
      return true;
    }
    
    return false;
  }

  toggleWorker(worker) {
    Meteor.call('toggleWorker', worker._id, !worker.running);
  }

  renderMinerList() {
    const { workers } = this.props;
    return workers.map(worker => (
      <tr key={worker._id}>
        <th scope="row">{worker.name}</th>
        <td>-</td>
        <td>ERR: no data</td>
        <td>ERR: no data</td>
        <td>ERR: no data</td>
        <td>ERR: no data</td>
        <td>ERR: no data</td>
        <td>ERR: no data</td>
      </tr>
    ));
  }

  render() {
    const { match, workers, currentWorker } = this.props;
    const activeWorker = match.params.id;
    console.log(currentWorker);

    const data = [
      {name: 'Page A', hashrate: 18.53, shares:1, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page B', hashrate: 30.00, shares:1, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page C', hashrate: 20.00, shares:1, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page D', hashrate: 27.80, shares:2, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page E', hashrate: 18.90, shares:3, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page F', hashrate: 23.90, shares:3, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page G', hashrate: 34.90, shares:4, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page A', hashrate: 40.00, shares:5, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page B', hashrate: 30.00, shares:5, denied:0, temp: 60, fanspeed: 64},
      {name: 'Page C', hashrate: 20.00, shares:8, denied:1, temp: 60, fanspeed: 64},
      {name: 'Page D', hashrate: 27.80, shares:10, denied:1, temp: 60, fanspeed: 64},
      {name: 'Page E', hashrate: 18.90, shares:13, denied:1, temp: 60, fanspeed: 64},
      {name: 'Page F', hashrate: 23.90, shares:14, denied:1, temp: 60, fanspeed: 64},
      {name: 'Page G', hashrate: 34.90, shares:16, denied:2, temp: 60, fanspeed: 64},
      {name: 'Page G', hashrate: 0, shares:0, denied:0, temp: 0, fanspeed: 0},
    ];

    return (
      <div>
        <WorkerTabs activeTab={activeWorker} workers={workers} className="tabs"/>

        <div className="data-sheet">

          <div>
            <HashChart data={data}/>
          </div>

          <div className="table-thing">
            {currentWorker && (
              <div className="miner-status">
                <span style={{color: '#fff'}}>{currentWorker.name}: {currentWorker.running ? 'running' : 'offline'}</span>
                {' '}
                <Button color="primary" onClick={() => this.toggleWorker(currentWorker)}>{!currentWorker.running ? 'Start' : 'Stop'}</Button>
              </div>
            )}
            <Table hover inverse>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Uptime</th>
                  <th>Hashrate</th>
                  <th>Accepted shares</th>
                  <th>Denied shares</th>
                  <th>Temperature</th>
                  <th>Fan speed</th>
                  <th>Last seen</th>            
                </tr>
              </thead>
              <tbody>
                {this.renderMinerList()}
              </tbody>
            </Table>
          </div>

        </div>
      </div>
    )
  }
}

export default windowSize(createContainer(({match}) => {
  Meteor.subscribe('Worker.all');

  return {
      currentUser: Meteor.user(),
      workers: Worker.find({}).fetch(),
      currentWorker: Worker.findOne({_id: match.params.id})
  };
}, Overview));