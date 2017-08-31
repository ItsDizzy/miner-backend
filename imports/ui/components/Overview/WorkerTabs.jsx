import React, { Component } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';


export default class WorkerTabs extends Component {    
  render() {
    const { activeTab } = this.props;
    return (
      <Nav tabs style={{ fontWeight:700 }}>
        <NavItem>
          <NavLink tag={Link} to="/overview" className={classNames({active: !activeTab})}>Overview</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/overview/1" style={{color:"#4B5053"}} className={classNames({active: activeTab == 1})}>Miner #1</NavLink>
        </NavItem>
      </Nav>
    );
  }
}