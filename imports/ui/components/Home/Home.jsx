import React, { Component } from 'react';

import {
  Container, Row, Col,
  Card, Button, CardTitle, CardText
} from 'reactstrap';

export default class Home extends Component {
  render() {
    return (
      <Container className="card-grid">
        <Row>
          <Col lg="9" sm="6" xs="12">
            <Card block outline inverse color="primary">
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col lg="3" sm="6" xs="12">
            <Card block outline inverse color="primary">
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="3" sm="6" xs="12">
            <Card block outline inverse color="primary">
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
          <Col lg="9" sm="6" xs="12">
            <Card block outline inverse color="primary">
              <CardTitle>Special Title Treatment</CardTitle>
              <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Go somewhere</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}