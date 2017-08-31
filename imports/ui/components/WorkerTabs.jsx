import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


export default class WorkerTabs extends Component {    
  render() {
    return (
      <Nav tabs style={{ fontWeight:700 }}>
        <NavItem>
          <NavLink href="#" active>Overview</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" style={{color:"#4B5053"}}>Miner #1</NavLink>
        </NavItem>
      </Nav>
    );
  }
}