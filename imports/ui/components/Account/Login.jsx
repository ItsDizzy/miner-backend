import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { 
  Card, Button, ButtonGroup,
  CardTitle, CardText,
  Container, Row, Col,
  Form, FormGroup, Label, Input
} from 'reactstrap';


export default class Login extends Component {

  state = {
    email: '',
    password: '',
    redirectToReferrer: false
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    // Checks will come later when we want...
    Meteor.loginWithPassword(this.state.email, this.state.password, err => {
      if(err) {
        // Handle error
        alert(err);
      } else {
        this.props.history.push(from);
      }
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md="12" lg={{ size: 6, offset: 3 }}>
              <Card block outline inverse color="primary">
                <CardTitle style={{textAlign: "center"}}>Login</CardTitle>
                <Form onSubmit={this.onSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="E-mail"
                      value={this.state.email}
                      onChange={(event) => {this.setState({email: event.target.value})}}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={(event) => {this.setState({password: event.target.value})}}
                    />
                  </FormGroup>
                  <ButtonGroup className="right">
                    <Button color="secondary">Register</Button>{' '}
                    <Button color="primary">Login</Button>{' '}
                  </ButtonGroup>
                </Form>
              </Card>
            </Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}