
import WebGLplot, { WebglLine, ColorRGBA } from "webgl-plot";

export default class TimeChart{
  /**
   * WlgLine draws time-serial plot on a HTML canvas
   * @param strCanvasID
   * 
   * Usage:
   *   lineObj = new TimeChart(strCanvasID);
   *   lineObj.start((line:WebglLine) => {
        const freq = 0.001;
        const amp = 0.5;
        const noise = 0.1;
    
        for (let i = 0; i < line.numPoints; i++) {
          const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
          const yNoise = Math.random() - 0.5;
          line.setY(i, ySin * amp + yNoise * noise);
        }
      });

        lineObj.stop();  // stop
        lineObj.start( ... ); // restart again
   */
  private cfgPlot: {wglp:WebGLplot, line:WebglLine};
  private cfbAnimation: {run:boolean};
  private cbDataUpdate: any;

  constructor(strCanvasID:string, numX:number=-1, numR:number=-1, numG:number=-1, numB:number=-1) {
    this.cfgPlot = TimeChart.__initTimeChart(strCanvasID, numX, numR, numG, numB);
    this.cfbAnimation = {run: false};
    this.cbDataUpdate = null;
  }

  public start(cbDataUpdate:any){
    this.__startAni(cbDataUpdate);
  }

  public stop(){
    this.__stopAni();
  }

  private static __initTimeChart(strCanvasID:string, numX:number=-1, numR:number=-1, numG:number=-1, numB:number=-1):{wglp:WebGLplot, line:WebglLine} {
    const canvas:HTMLCanvasElement =  document.getElementById(strCanvasID) as HTMLCanvasElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * devicePixelRatio;
    canvas.height = canvas.clientHeight * devicePixelRatio;

    if (numX === -1){
        numX = canvas.width; // 50*1000;
    }
    let color:ColorRGBA;
    if (numR === -1 || numG === -1 || numB === -1){
        color = new ColorRGBA(Math.random(), Math.random(), Math.random(), 1);
    } else{
        color = new ColorRGBA(numR, numG, numB, 1);
    }
    let line1:WebglLine = new WebglLine(color, numX);
    let wglp1:WebGLplot = new WebGLplot(canvas);

    line1.lineSpaceX(-1, 2 / numX);
    wglp1.addLine(line1);

    return {wglp:wglp1, line:line1};
  }

  private __stopAni(){
    this.cfbAnimation.run = false;
  }

  private __startAni(cbDataUpdate:any){
    this.cbDataUpdate = cbDataUpdate;
    this.cfbAnimation.run = true;
    requestAnimationFrame(() => {
      this.__newFrame();
    });
  }

  private __newFrame() {
    if (!this.cfbAnimation.run)
      return;

    if (this.cbDataUpdate === null){
      throw ("[Error] TimeChart:: __newFrame:: this.cbDataUpdate === null");
    }

    this.cbDataUpdate(this.cfgPlot.line);
    this.cfgPlot.wglp.update();
    requestAnimationFrame(() => {
      this.__newFrame();
    });
  }
}
