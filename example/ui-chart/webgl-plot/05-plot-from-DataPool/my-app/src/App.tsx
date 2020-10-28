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
  private cfgPlot: {wglp:WebGLplot, line:WebglLine};
  private cfbAnimation: {run:boolean};

  constructor(strCanvasID:string) {
    this.cfgPlot = TimeChart.__initTimeChart(strCanvasID);
    this.cfbAnimation = {run: false};
  }

  public run(){
    this.cfbAnimation.run = true;
    this.__startAni();
  }

  public stop(){
    this.__stopAni();
  }

  private static __initTimeChart(strCanvasID:string):{wglp:WebGLplot, line:WebglLine} {
    const canvas:HTMLCanvasElement =  document.getElementById(strCanvasID) as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    const numX = canvas.width; // 50*1000;
    const color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    let line1:WebglLine = new WebglLine(color, numX);
    let wglp1:WebGLplot = new WebGLplot(canvas);

    line1.lineSpaceX(-1, 2 / numX);
    wglp1.addLine(line1);

    return {wglp:wglp1, line:line1};
  }

  private __stopAni(){
    this.cfbAnimation.run = false;
  }

  private __startAni(){
    if (!this.cfbAnimation.run)
      return;

    requestAnimationFrame(() => {
      this.__newFrame();
    });
  }

  private __newFrame() {
    this.updateData();
    this.cfgPlot.wglp.update();
    this.__startAni();
  }

  updateData(){
    const freq = 0.001;
    const amp = 0.5;
    const noise = 0.1;

    for (let i = 0; i < this.cfgPlot.line.numPoints; i++) {
      const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
      const yNoise = Math.random() - 0.5;
      this.cfgPlot.line.setY(i, ySin * amp + yNoise * noise);
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
    let arrayTimeChart:Array<TimeChart> = [];

    for(let i = 0; i<12; i++){
      let strCanvasID:string = 'my_canvas'+(i+1);
      let timechartObj:TimeChart = new TimeChart(strCanvasID);
      arrayTimeChart[i] = timechartObj;
      timechartObj.run();
    }

    setTimeout(() => {
      arrayTimeChart[0].stop();
    }, 5000);
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
