import React, { Component } from 'react';
import {Router, Route} from 'react-router-dom';

import WorkerTabs from './WorkerTabs';
import InfoRoot from './InfoRoot';
import Test from './Test';

export default class Contents extends Component {
  render() {
    return (
      <Router className="contents">
        <Route path={""} component={InfoRoot}/>
        <Route path={"test"} component={Test}/>
        {/* <WorkerTabs/>
        <InfoRoot className="info-root">
          <Test></Test>
        </InfoRoot> */}
      </Router>
    );
  }
}