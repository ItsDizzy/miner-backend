import React, { Component } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import windowSize from 'react-window-size';

class HashChart extends Component {    
  render() {
    const { data } = this.props;
    return (
        <AreaChart width={this.props.windowWidth-140} height={200} data={data} className="data-sheet">
        
          <Area type="monotone" dataKey="hashrate" stroke='#8884d8' fill='#8884d8'/>
          <Area type="monotone" dataKey="shares" stroke='#82ca9d' fill='#82ca9d'/>
          <Area type="monotone" dataKey="denied" stroke='#ca8282' fill='#ca8282'/>

          <CartesianGrid stroke="#555" strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />
        </AreaChart>
    );
  }
}

export default windowSize(HashChart);