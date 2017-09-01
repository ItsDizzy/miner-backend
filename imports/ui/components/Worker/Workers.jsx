import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';

import { Worker } from '../../../api/Worker';

import CreateWorker from './Actions/CreateWorker';
import EditWorker from './Actions/EditWorker';
import DeleteWorker from './Actions/DeleteWorker';

class Workers extends Component {

  renderAction(action, id) {
    switch(action) {
      case 'create':
        return <CreateWorker onClose={this.handleClose} />;
      case 'edit':
        return <EditWorker id={id} onClose={this.handleClose} />;
      case 'delete':
        return <DeleteWorker id={id} onClose={this.handleClose} />;
      default:
        console.log('No Action');
    }
  }

  handleClose = () => {
    this.props.history.push('/workers');
  }

  render() {
    const { match: { params: { action, id } }, workers, loading } = this.props;

    return (
      <div>
        
        <div className="data-sheet">
          <h3 className="title">Workers</h3>
          <div className="table-thing">
          <h5><Link to={"/workers/create"}>New worker</Link></h5>
            <Table hover inverse>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Wallet</th>
                  <th>E-mail</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {workers.map(worker => (
                  <tr key={worker._id}>
                    <th scope="row">{worker._id}</th>
                    <td>{worker.name}</td>
                    <td>{worker.wallet}</td>
                    <td>{worker.email || 'Not Configured Yet'}</td>
                    <td><Link to={`/workers/edit/${worker._id}`}>Edit</Link></td>
                    <td><Link to={`/workers/delete/${worker._id}`}>Delete</Link></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

        </div>

        {this.renderAction(action, id)}
      </div>
    )
  }
}

export default createContainer(({match}) => {
  const sub = Meteor.subscribe('Worker.all');

  return {
      currentUser: Meteor.user(),
      loading: sub.ready(),
      workers: Worker.find({}).fetch()
  };
}, Workers);