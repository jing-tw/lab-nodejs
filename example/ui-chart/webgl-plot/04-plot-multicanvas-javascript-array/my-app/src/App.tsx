import React, {Component} from 'react';
import './App.css';

import DataPool, {Test_DataPool} from './DataPool';
import WebGLplot, { WebglLine, ColorRGBA } from "webgl-plot";

class App extends Component {
  private __pool:DataPool = new DataPool();

  constructor(props:any) {
    super(props);
    // this.__pool.addData(100); // initial 100 random number
  }

  componentDidMount() {
    for(let i = 1; i<=12; i++){
      let strCanvasID:string = 'my_canvas'+i;
      let retObj:{'line': WebglLine, 'wglp': WebGLplot} = this.__initWglpLine(strCanvasID);
      this.run(retObj['wglp'],retObj['line']);
    }
  }

  run(wglp:WebGLplot, line:WebglLine){
    requestAnimationFrame(() => {
      this.__newFrame(wglp, line);
    });
  }

  __newFrame(wglp:WebGLplot, line:WebglLine) {
    if (wglp === null || line === null)
      return;
    this.updateData(line);
    wglp.update();
    this.run(wglp, line);
  }

  __initWglpLine(strCanvasID:string):{'line': WebglLine, 'wglp': WebGLplot} {
    const canvas:HTMLCanvasElement =  document.getElementById(strCanvasID) as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    const numX =50*1000; //canvas.width;
    const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    let line:WebglLine = new WebglLine(color, numX);
    let wglp:WebGLplot = new WebGLplot(canvas);

    line.lineSpaceX(-1, 2 / numX);
    wglp.addLine(line);

    return {'line': line, 'wglp': wglp};
  }

  updateData(line:WebglLine){
    const freq = 0.001;
    const amp = 0.5;
    const noise = 0.1;
  
    for (let i = 0; i < line.numPoints; i++) {
      const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
      const yNoise = Math.random() - 0.5;
      line.setY(i, ySin * amp + yNoise * noise);
    }
  }

  graphStyle = {
    width: '700px',
    height: '300px',
  };


  render() {
      return (
        <div>
          <canvas style={this.graphStyle} id="my_canvas1"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas2"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas3"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas4"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas5"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas6"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas7"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas8"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas9"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas10"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas11"></canvas>
          <br/>
          <canvas style={this.graphStyle} id="my_canvas12"></canvas>
        </div>
      )
  }
}

export default App;
