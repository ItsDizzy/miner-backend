import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Worker } from '../../../../api/Worker';

class DeleteWorker extends Component {

  state = {
    isOpen: true
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loading) {
      this.setState({isOpen: true});
    }
  }

  close = () => {
    this.setState({isOpen: !this.state.isOpen});

    setTimeout(() => {
      this.props.onClose();
    }, 350);
  }

  handleSubmit = () => {
    Meteor.call('deleteWorker', this.props.id, err => {
      if(err) console.log(err);

      this.close();
    });
  }

  render() {
    const { currentWorker } = this.props;

    return (
      <Modal isOpen={this.state.isOpen}>
        <ModalHeader toggle={this.close}>Delete Worker: {currentWorker.name}</ModalHeader>
        <ModalBody>
          Are you sure you want to remove the <b>{currentWorker.name}</b> worker?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={this.handleSubmit}>Confirm</Button>{' '}
          <Button color="secondary" onClick={this.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

DeleteWorker.defaultProps = {
  currentWorker: {
    name: '',
    wallet: '',
    email: ''
  }
}

export default createContainer(({id}) => {
  const sub = Meteor.subscribe('Worker.currentWorker', id);

  return {
      loading: !sub.ready(),
      currentWorker: Worker.findOne({_id: id})
  };
}, DeleteWorker);