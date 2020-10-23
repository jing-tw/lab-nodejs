// Ref. https://github.com/nagix/chartjs-plugin-streaming#push-model-listening-based
import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-streaming';
import './App.css';

class App extends Component {
  dictOptions:any =  {
    scales: {
      xAxes: [{
        type: 'realtime',
        delay: 2000,
      }]
    }
  };

  dictDataCfg:any = {
    datasets: [{
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }, {
      label: 'Dataset 2',
      borderColor: 'rgb(54, 162, 235)',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      fill: false,
      data: []
    }]
  };

  private myRefLine:any = null;  // for Line chart obj
  

  constructor(props:any) {
    super(props);
  }

  componentDidMount(){
    // Simulate the MQTT event listener code
    // setInterval(() => {
    //   this.onReceive();
    // }, 100);
    
    setInterval(() => {
      this.onReceive();
    }, 1);
    
  }

  // Todo: Your event listener code - assuming the event object has the timestamp and value properties
  onReceive(){
    if (this.myRefLine == null)
        return;

      let myChart:any = this.myRefLine.chartInstance;
      // for(let i=0; i<12; i=i+1){
      //     myChart.data.datasets[i].data.push({
      //       x: Date.now(),
      //       y: Math.floor(Math.random() * 100)
      //     });
      // }
      // myChart.data.datasets[0].data.push({
      //   x: Date.now(),
      //   y: Math.floor(Math.random() * 100)
      // });

      myChart.data.datasets[1].data.push({
        x: Date.now(),
        y: Math.floor(Math.random() * 100)
      });

      // update chart datasets keeping the current animation
      myChart.update({
          preservation: true
      });
  }

  render() {
    return (
      <Line
        data={this.dictDataCfg}
        options={this.dictOptions}
        ref = {(ref) => this.myRefLine = ref}
      />
    );
  }
}

export default App;