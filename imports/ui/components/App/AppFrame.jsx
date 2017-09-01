import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, NavDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';

class AppFrame extends Component {
  state = {
    isNavOpen: false,
    isUserOpen: false
  }

  toggleNavbar = () => {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }

  toggleUserDropdown = () => {
    this.setState({
      isUserOpen: !this.state.isUserOpen
    });
  }

  renderLoginNav() {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/account/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/account/register">Register</NavLink>
        </NavItem>
      </Nav>
    )
  }

  renderUserNav() {
    const { currentUser } = this.props;
    return (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/overview/">Overview</NavLink>
        </NavItem>
        <NavDropdown isOpen={this.state.isUserOpen} toggle={this.toggleUserDropdown}>
          <DropdownToggle nav caret>
            {currentUser.emails[0].address}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem tag={Link} to="/account/workers">Workers</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={() => Meteor.logout()}>Logout</DropdownItem>
          </DropdownMenu>
        </NavDropdown>
      </Nav>
    )
  }

  render() {
    const { children, currentUser } = this.props;
    return (
      <div>
        <Navbar color="faded" toggleable inverse>
          <NavbarToggler right onClick={this.toggleNavbar} />
          <NavbarBrand tag={Link} to="/">ClayMore Miner</NavbarBrand>
          <Collapse isOpen={this.state.isNavOpen} navbar>
            {!currentUser ? 
              this.renderLoginNav()
            :
              this.renderUserNav()
            }
          </Collapse>
        </Navbar>
        {children}
      </div>
    )
  }
}

export default withRouter(createContainer(() => {
  return {
      currentUser: Meteor.user(),
  };
}, AppFrame));