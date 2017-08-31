import React, { Component } from 'react';

import WorkerTabs from './WorkerTabs';

export default class Home extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <WorkerTabs activeTab={match.params.id}/>
      </div>
    )
  }
}