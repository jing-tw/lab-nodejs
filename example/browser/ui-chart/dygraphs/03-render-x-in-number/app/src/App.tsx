import React, {Component} from 'react';
import './App.css';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'
import hrtime from 'browser-hrtime';

import DataPool, {Test_DataPool} from './DataPool';

type MyState = {diff: [number, number]};
class App extends Component<{}, MyState> {
  private __startFPS:[number, number];
  private __diffFPS:[number, number];
  private __pool:DataPool = new DataPool();


  private __timeStart:[number, number];
  private __timeDiff:[number, number];
  private __numDataCount:number;

  data:any = [];
  g:any = null;

  constructor(props:any) {
      super(props);
      this.state = {diff: [0, 0]};
      this.__startFPS = hrtime();
      this.__diffFPS = [0, 0];
      this.__numDataCount = 300;
      this.__pool.addData(this.__numDataCount); // initial 100 random number

      this.__timeStart = hrtime();
      this.__timeDiff = [0, 0];
  }

  componentDidMount() {
    var t = new Date();
    this.g = new Dygraph('graph', this.data, {
      drawPoints: true,
      showRoller: true,
      valueRange: [0.0, 1.2],
      labels: ['Time', 'Random']
    });

    let numSamplingRate:number = 10;

    setInterval(() => {
      this.__diffFPS = hrtime(this.__startFPS);
      this.setState({diff:this.__diffFPS});   // trigger render
      this.updateScreen();
      this.__startFPS = hrtime();
    }, 1000/numSamplingRate);

    

  }

  

  x:number = 0;
  updateScreen(){
    // var x = new Date(); // current time
    this.x++;
    let y:number|undefined;
    if (this.__pool.getCapacity() > 0) {
      y = this.__pool.removeData();
      console.log('App::updateScreen: y = ', y);
    } else {
      y = 0;
      // console.log('App::updateScreen: out of data. y = 0');

      this.__timeDiff = hrtime(this.__timeStart);
      let numDiffSec:number = (this.__timeDiff[0] * 1e9 + this.__timeDiff[1])/Math.pow(10,9);
      if (numDiffSec == 0)
        numDiffSec = 0.000000000000000001;
      console.log('[Info] DataPool::removeData:: Average sampling rate = ', this.__numDataCount/numDiffSec);
    }

    if(this.data.length > 100){
      this.data.shift();
    }
    this.data.push([this.x, y]);
    
    this.g.updateOptions({
      'file': this.data
    });
  }

  render() {
    // let duration:number = this.state.diff[0] * 1e9 + this.state.diff[1];
    let duration:number = this.__diffFPS[0] * 1e9 + this.__diffFPS[1];
    // console.log('duration = ', duration);
    // console.log('duration (milliseconds) = ', duration/Math.pow(10,6));
    // console.log('duration (seconds) = ', duration/Math.pow(10,9));
    return (
        <div>
          <h2>Benchmark took {duration/Math.pow(10,6)} milliseconds </h2>
          <h2>Benchmark took {duration/Math.pow(10,9)} seconds </h2>
          <h2>Benchmark took (samples/sec):  {1/(duration/Math.pow(10,9))}  </h2>
          <h2>this.__pool.getCapacity():  {this.__pool.getCapacity()}  </h2>
          
          <div id="graph"></div>
        </div>
      );
  }

}

export default App;
