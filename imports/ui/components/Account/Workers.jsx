import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import windowSize from 'react-window-size';

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Table } from 'reactstrap';

import { Worker } from '../../../api/Worker';

class Workers extends Component {
  shouldComponentUpdate(nextProps) {
    if(nextProps.workers != this.props.workers) {
      return true;
    }
    
    return false;
  }

  render() {
    const { match, workers } = this.props;
    const activeWorker = match.params.id;

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

    console.log(workers.find(worker => worker._id == activeWorker));

    return (
      <div>
        
        <div className="data-sheet">
          <div className="table-thing">
          <h5><Link to={"/lol"}>New worker</Link></h5>
            <Table hover inverse>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Wallet</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">TTgTPpsMSrBEJtjxM</th>
                  <td>GreyW</td>
                  <td>0x4268098642d7807ae4c192266b86331c8cb8e942</td>
                  <td><Link to={"/lol"}>Delete</Link></td>
                  <td><Link to={"/lol"}>Edit</Link></td>
                </tr>
              </tbody>
            </Table>
          </div>

        </div>
      </div>
    )
  }
}

export default windowSize(createContainer(() => {
  Meteor.subscribe('Worker.all');

  return {
      currentUser: Meteor.user(),
      workers: Worker.find({}).fetch()
  };
}, Workers));