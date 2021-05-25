import React, {Component} from 'react';
import './App.css';

import DataPool, {Test_DataPool} from './DataPool';

import WebGLplot, { WebglLine, ColorRGBA } from "webgl-plot";



class App extends Component {
  private __pool:DataPool = new DataPool();

  wglp:WebGLplot|null = null;
  line:any;

  constructor(props:any) {
    super(props);
    // this.__pool.addData(100); // initial 100 random number
  }

  init(){
    const canvas:HTMLCanvasElement =  document.getElementById("my_canvas") as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    if (canvas === null)
      return;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    const numX = canvas.width;
    const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    this.line = new WebglLine(color, numX);
    this.wglp = new WebGLplot(canvas);

    this.line.lineSpaceX(-1, 2 / numX);
    this.wglp.addLine(this.line);
  }

  
  updateData(){
    const freq = 0.001;
    const amp = 0.5;
    const noise = 0.1;
  
    for (let i = 0; i < this.line.numPoints; i++) {
      const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
      const yNoise = Math.random() - 0.5;
      this.line.setY(i, ySin * amp + yNoise * noise);
    }
  }

  newFrame() {
    this.updateData();
    if (this.wglp === null)
      return;
    this.wglp.update();
    requestAnimationFrame(this.newFrame.bind(this));
  }

  
 
  componentDidMount() {
    this.init();
    requestAnimationFrame(this.newFrame.bind(this));
  }

  updateScreen(){
    
  }

  graphStyle = {
    width: '1500px',
    height: '300px',
  };


  render() {
      return (
        <div>
          <canvas style={this.graphStyle} id="my_canvas"></canvas>
        </div>
      )
  }

}

export default App;
