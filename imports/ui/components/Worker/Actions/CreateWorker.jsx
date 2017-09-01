import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input
} from 'reactstrap';

export default class CreateWorker extends Component {

  state = {
    isOpen: true,
    name: '',
    wallet: '',
    email: ''
  }

  close = () => {
    this.setState({isOpen: !this.state.isOpen});

    setTimeout(() => {
      this.props.onClose();
    }, 350);
  }

  handleSubmit = () => {
    const { name, wallet, email } = this.state;
    Meteor.call('createWorker', name, wallet, email, err => {
      if(err) console.error(err);

      this.close();
    });
  }

  render() {
    return (
      <Modal isOpen={this.state.isOpen} toggle={this.close}>
        <ModalHeader toggle={this.close}>Create Worker</ModalHeader>
        <ModalBody>
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
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
                value={this.state.password}
                onChange={(event) => this.setState({email: event.target.value})}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleSubmit}>Create</Button>{' '}
          <Button color="secondary" onClick={this.close}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}