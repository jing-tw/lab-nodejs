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
      this.__numDataCount = 3000;
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


    // test, draw 
    let numRefrashDurationInMs:number = 10; // 10ms refrash
    setInterval(() => {
      this.__diffFPS = hrtime(this.__startFPS);
      this.setState({diff:this.__diffFPS});   // trigger render
      this.updateScreen();
      this.__startFPS = hrtime();
    }, numRefrashDurationInMs);

  }

  x:number = 0;
  bEnd:boolean = false;
  updateScreen(){
    if (this.bEnd){
      return;
    }

    const numDisplaySampleSize:number = 5;
    if (this.__pool.getCapacity() > numDisplaySampleSize) {
      let numArrayData:Array<number> = this.__pool.removeArrayData(numDisplaySampleSize);

      for(let i=0; i<numArrayData.length; i++){
        // console.log(i,'data[i] = ', numArrayData[i]);
        this.data.push([this.x, numArrayData[i]]);
        this.x++;
        console.log('x = ', this.x);
      }
    }else{
      // out of data
      this.__timeDiff = hrtime(this.__timeStart);
      let numDurationSec:number = (this.__timeDiff[0] * 1e9 + this.__timeDiff[1])/Math.pow(10,9);
      let numSamplingRate:number = this.__numDataCount/numDurationSec;
      console.log('x = ', this.x, ' this.__numDataCount = ', this.__numDataCount, ' numDurationSec = ', numDurationSec, ' numSamplingRate = ', numSamplingRate);
      this.bEnd = true;
    }

    const numDisplayTotalSample:number = numDisplaySampleSize * 100;
    if(this.data.length > numDisplayTotalSample){
      this.data = this.data.slice(numDisplaySampleSize);
    }

    // console.log('update');
    this.g.updateOptions({
      'file': this.data
    });
      
  
  }

  graphStyle = {
    width: '1500px',
    height: '300px',
  };

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
          
          <div id="graph" style={this.graphStyle}></div>
        </div>
      );
  }

}

export default App;
