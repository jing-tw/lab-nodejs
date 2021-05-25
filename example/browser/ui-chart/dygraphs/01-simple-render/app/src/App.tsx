import React, {Component} from 'react';
import './App.css';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.min.css'

class App extends Component {
  data:any = [];
  g:any = null;

  constructor(props:any) {
      super(props);
  }
  
  render() {
      return <div id="graph"></div>;
  }

  onReceive(){
    if(this.g == null)
      return;

    var x = new Date(); // current time
    var y = Math.random();
    if(this.data.length > 100){
      this.data.shift();
    }
    this.data.push([x, y]);
    
    this.g.updateOptions({
      'file': this.data
    });
  }

  componentDidMount() {
    var t = new Date();
    this.g = new Dygraph('graph', this.data, {
      drawPoints: true,
      showRoller: true,
      valueRange: [0.0, 1.2],
      labels: ['Time', 'Random']
    });

    setInterval(() => {
      this.onReceive();
    }, 500);
  }
}

export default App;
