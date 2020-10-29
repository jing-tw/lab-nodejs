import TimeChart from './TimeChart'
import {WebglLine} from "webgl-plot";
import DataPool from './DataPool';

class DrawLine{
    public static timeShift(line:WebglLine, __pool:DataPool, numArrayScreen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number,){
        let numArrayChrunk:Array<number>;
        if(__pool.getCapacity() < numChunk){
            numArrayChrunk = numArrayChunkZero;
        }else{
            numArrayChrunk = __pool.removeArrayData(numChunk);
        }

        numArrayScreen = numArrayScreen.concat(numArrayChrunk); // [ screen + new data]
        numArrayScreen = numArrayScreen.slice(numChunk); // [ old ] + [screen]

        for (let i = 0; i < line.numPoints; i++) {
            line.setY(i, numArrayScreen[i]);
        }
        return numArrayScreen;
    }
}

export default class Test_TimeChart{
    public static run(){
        Test_TimeChart.test_StartStopRestart();
        Test_TimeChart.test_PlotTimelineFromDataPool();
    }

    public static test_PlotTimelineFromDataPool(){
        let __pool:DataPool = new DataPool();
        let totalData:number = 60 * 300;
        __pool.addRandomData(totalData);

        let i:number = 0;

        let numLineX:number = 10 * 300;
        let numChunk:number = 10;
        let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
        let numArrayScreen:Array<number> = new Array<number>(numLineX);

        let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numLineX, 1,0,0);
            chart.start((line:WebglLine) => {
                numArrayScreen = DrawLine.timeShift(line, __pool, numArrayScreen, numArrayChunkZero, numChunk);
            }
        );
    }

    public static test_StartStopRestart(){
      let arrayTimeChart:Array<TimeChart> = [];

      for(let i = 0; i<12; i++){
        let chart:TimeChart = new TimeChart('my_canvas'+(i+1));
        arrayTimeChart.push(chart);
        chart.start((line:WebglLine) => {
          const freq = 0.001;
          const amp = 0.5;
          const noise = 0.1;

          for (let i = 0; i < line.numPoints; i++) {
            const ySin = Math.sin(Math.PI * i * freq * Math.PI * 2);
            const yNoise = Math.random() - 0.5;
            line.setY(i, ySin * amp + yNoise * noise);
          }
        });
      }

      // test: stop channel 1
      setTimeout(() => {
        arrayTimeChart[0].stop();
      }, 5000);

      // test restart channel 1
      setTimeout(() => {
        arrayTimeChart[0].start(
          (line:WebglLine) => {
            const freq = 0.001;
            const amp = 0.5;
            const noise = 0.1;

            for (let i = 0; i < line.numPoints; i++) {
              const yCos = Math.cos(Math.PI * i * freq * Math.PI * 2);
              const yNoise = Math.random() - 0.5;
              line.setY(i, yCos * amp + yNoise * noise);
            }
          }
        );
      }, 5000 + 2000);
    }
  }