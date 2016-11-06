import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

    this.x = false;
    this.state = {myXState: this.x};    // setup the state with key, vaue pair of  myXState and this.x

    this.onChange = this.onChange.bind(this);   // bind the onChange method to customized onChange method
  }

  onChange() {
    this.x = !this.x;    // update x
    this.setState({myXState: this.x});   // change the component state with {myXState key with this.x value}, this will force to redraw
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <label>
          <input 
             type ="checkbox"
             checked = {this.x}
             onChange = {this.onChange}
          />
          {this.x ? "On" : "Off"}
        </label>
      </div>
    );
  }
}

export default App;
