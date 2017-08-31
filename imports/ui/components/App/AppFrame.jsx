import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class AppFrame extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <Navbar color="faded" toggleable inverse>
          <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand tag={Link} to="/">ClayMore Miner</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/overview/">Overview</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/account/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        {children}
      </div>
    )
  }
}