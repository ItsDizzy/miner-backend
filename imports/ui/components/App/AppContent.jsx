import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';

export default class AppContent extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className="contents">
        {children}
      </div>
    );
  }
}