import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { 
  Card, Button, ButtonGroup,
  CardTitle, CardText,
  Container, Row, Col,
  Form, FormGroup, Label, Input
} from 'reactstrap';


export default class Register extends Component {    
  render() {
    const { activeTab } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col xs="3"></Col>
            <Col xs="6">
              <Card block outline inverse color="primary">
                <CardTitle style={{textAlign: "center"}}>Register</CardTitle>
                <Form>
                  <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="E-mail" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password" />
                  </FormGroup>
                  <ButtonGroup className="right">
                    <Button color="secondary">Register</Button>{' '}
                    <Button color="primary">Login</Button>{' '}
                  </ButtonGroup>
                </Form>
              </Card>
            </Col>
            <Col xs="3"></Col>
          </Row>
        </Container>
        
      </div>
    );
  }
}