import React, {Component} from 'react';
import './App.css';

import DataPool, {Test_DataPool} from './DataPool';

class App extends Component {
  private __pool:DataPool = new DataPool();

  constructor(props:any) {
      super(props);
      this.__pool.addData(100); // initial 100 random number
  }

  componentDidMount() {

  }

  updateScreen(){
    
  }

  render() {
      return <div id="graph"></div>;
  }

}

export default App;
