import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';

import { Worker } from '../../../../api/Worker';


class EditWorker extends Component {

  state = {
    isOpen: false,
    ...this.props.currentWorker
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.worker !== nextProps.currentWorker) {
      this.setState({...nextProps.currentWorker});
    }

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
    const { name, wallet, email } = this.state;

    Meteor.call('updateWorker', this.props.id, name, wallet, email, err => {
      if(err) console.log(err);

      this.close();
    })
  }

  render() {
    const { currentWorker } = this.props;

    return (
      <Modal isOpen={this.state.isOpen}>
        <ModalHeader toggle={this.close}>Edit Worker: {currentWorker.name}</ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                disabled={currentWorker.running}
                value={this.state.name}
                onChange={(event) => this.setState({name: event.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label for="wallet">Wallet</Label>
              <Input
                type="wallet"
                name="wallet"
                id="wallet"
                placeholder="Wallet"
                disabled={currentWorker.running}
                value={this.state.wallet}
                onChange={(event) => this.setState({wallet: event.target.value})}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="E-mail"
                disabled={currentWorker.running}
                value={this.state.email}
                onChange={(event) => this.setState({email: event.target.value})}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={currentWorker.running} onClick={this.handleSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={this.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditWorker.defaultProps = {
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
}, EditWorker);