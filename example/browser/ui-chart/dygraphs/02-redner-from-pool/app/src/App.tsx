import React, {Component} from 'react';
import './App.css';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'

import DataPool, {Test_DataPool} from './DataPool';

class App extends Component {
  private __pool:DataPool = new DataPool();

  data:any = [];
  g:any = null;

  constructor(props:any) {
      super(props);
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

    let numSamplingRate:number = 300;

    setInterval(() => {
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
      return <div id="graph"></div>;
  }

}

export default App;
