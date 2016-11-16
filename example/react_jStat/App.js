import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var jStat = require('jStat').jStat;

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {Count : 0, Mean : 0};  // state variable
    this.localvar = 0;   // member variable

    // bind your callback function  
    this.onMyClick = this.onMyClick.bind(this);
  }

  onMyClick () {
    let local_count = this.state.Count + 1;
    this.setState({Count: local_count});
    console.log("onMyClick local_count = " + local_count);
 
    // Call JStat Example 
      var array_1d = [1, 2, 3, 4];
      var mean = jStat.mean(array_1d);
      console.log("mean = "  + mean);
      this.setState({Mean: mean});

  }

  render() {
    return (
      <div className="App">
        //  React Logo 
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Callback function Demo</h2>
        </div>
 
        //  Main 
        abc = <span> {this.state.Count} </span>
        mean = <span> {this.state.Mean} </span>
        <button onClick={this.onMyClick}> Call My Click</button>

      </div>
    );
  }
}

export default App;
