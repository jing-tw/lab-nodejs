import React, {Component} from 'react';
import './App.css';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'

import DataPool, {Test_DataPool} from './DataPool';
import hrtime from 'browser-hrtime';

type MyState = {diff: [number, number]};

class App extends Component<{}, MyState> {
  private __start:[number, number];
  private __pool:DataPool = new DataPool();

  data:any = [];
  g:any = null;

  constructor(props:any) {
      super(props);

      this.state = {diff: [0, 0]};
      this.__start = hrtime();
      this.__pool.addData(100); // initial 100 random number
  }

  componentDidMount() {
    var t = new Date();
    this.g = new Dygraph('graph', this.data, {
      drawPoints: true,
      showRoller: true,
      valueRange: [0.0, 1.2],
      labels: ['Time', 'Random']
    });

    let numSamplingRate:number = 1; //300;

    setInterval(() => {
      const diff:[number, number] = hrtime(this.__start);
      this.setState({diff:diff});
      this.__start = hrtime(); // reset start

      this.updateScreen();
    }, 1000/numSamplingRate);
  }

  updateScreen(){
    var x = new Date(); // current time
    let y:number|undefined;
    if (this.__pool.getCapacity() > 0) {
      y = this.__pool.removeData();
      console.log('App::updateScreen: y = ', y);
    } else {
      y = 0;
      console.log('App::updateScreen: out of data. y = 0');
    }

    if(this.data.length > 100){
      this.data.shift();
    }
    this.data.push([x, y]);
    
    this.g.updateOptions({
      'file': this.data
    });
  }
  
  render() {
    let duration:number = this.state.diff[0] * 1e9 + this.state.diff[1];
      return (
        <div>
          <h2>Benchmark took {this.state.diff[0] * 1e9 + this.state.diff[1]} nanoseconds</h2>
          <h2>Benchmark took {duration/Math.pow(10,6)} milliseconds </h2>
          <h2>Benchmark took {duration/Math.pow(10,9)} seconds </h2>
          <h2>sampling rate = {1/(duration/Math.pow(10,9))} Hz </h2>
          <div id="graph"></div>;
        </div>
      )
  }

}

export default App;
