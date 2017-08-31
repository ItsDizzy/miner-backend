import React, { Component } from 'react';

export default class InfoRoot extends Component {
  render() {
    return(
      <div>{this.props.children}</div>
    );    
  }
}