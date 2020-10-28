import React, {Component} from 'react';
import './App.css';

import DataPool, {Test_DataPool} from './DataPool';
import WebGLplot, { WebglLine, ColorRGBA } from "webgl-plot";

class TimeChart{
  /**
   * WlgLine draws time-serial plot on a HTML canvas
   * @param strCanvasID
   * 
   * Usage:
   *   lineObj = new TimeChart(strCanvasID);
   *   lineObj.run();
   */
  
    private wglp:WebGLplot|null = null;
    private line:WebglLine|null = null;

  constructor(strCanvasID:string) {
    let retObj:{'line': WebglLine, 'wglp': WebGLplot} = TimeChart.__initTimeChart(strCanvasID);
    this.wglp = retObj['wglp'];
    this.line = retObj['line'];
  }

  private static __initTimeChart(strCanvasID:string):{'line': WebglLine, 'wglp': WebGLplot} {
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

  public run(){
    requestAnimationFrame(() => {
      this.__newFrame();
    });
  }

  private __newFrame() {
    if (this.wglp === null || this.line === null)
      return;
    this.updateData(this.line);
    this.wglp.update();
    this.run();
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
}

class App extends Component {
  private __pool:DataPool = new DataPool();

  constructor(props:any) {
    super(props);
    // this.__pool.addData(100); // initial 100 random number
  }

  componentDidMount() {
    for(let i = 1; i<=12; i++){
      let strCanvasID:string = 'my_canvas'+i;
      let timechartObj:TimeChart = new TimeChart(strCanvasID);
      timechartObj.run();
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
