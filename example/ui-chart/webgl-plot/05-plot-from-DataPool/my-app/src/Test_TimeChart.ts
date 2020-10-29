import TimeChart from './TimeChart'
import {WebglLine} from "webgl-plot";
import DataPool from './DataPool';

import hrtime from 'browser-hrtime';

class DrawLine{
    public static timeShift(line:WebglLine, __pool:DataPool, numArrayScreen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number,){
        let numArrayChunk:Array<number>;
        if(__pool.getCapacity() < numChunk){
            numArrayChunk = numArrayChunkZero;
        }else{
            numArrayChunk = __pool.removeArrayData(numChunk);
        }

        numArrayScreen = numArrayScreen.concat(numArrayChunk); // [ screen + new data]
        numArrayScreen = numArrayScreen.slice(numChunk); // [ old ] + [screen]

        for (let i = 0; i < line.numPoints; i++) {
            line.setY(i, numArrayScreen[i]);
        }
        return numArrayScreen;
    }

    public static timeShift2(line:WebglLine, __pool:DataPool, numArrayScreen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number,){
        let numArrayChunk:Array<number>;
        if(__pool.getCapacity() < numChunk){
            numArrayChunk = numArrayChunkZero;
        }else{
            numArrayChunk = __pool.removeArrayData(numChunk);
        }

        // let start:[number, number] = hrtime();

        numArrayScreen.splice(0, numChunk); // remove the first numChunk's data
        numArrayScreen.splice(-1, 0, ...numArrayChunk); // append numArrayChunk

        // const diff:[number, number] = hrtime(start);
        // let dur:bigint = BigInt(diff[0] * 1e9 + diff[1]);
        // console.log('Benchmark tool diff = ', diff);
        // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 6))} milliseconds.`);
        // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 9))} seconds.`);
       

        for (let i = 0; i < line.numPoints; i++) {
            line.setY(i, numArrayScreen[i]);
        }
        return numArrayScreen;
    }
}

export default class Test_TimeChart{
    public static run(){
        // Test_TimeChart.test_StartStopRestart();
        // Test_TimeChart.test_PlotTimelineFromDataPool_v2();
        Test_TimeChart.test_PlotTimelineFromDataPool_12L();
    }

    public static test_PlotTimelineFromDataPool_v1(){
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
        });
    }
    public static test_PlotTimelineFromDataPool_v2(){
        let __pool:DataPool = new DataPool();
        let totalData:number = 60 * 300;
        __pool.addRandomData(totalData);

        let i:number = 0;

        let numLineX:number = 10 * 300;
        let numChunk:number = 100;
        let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
        let numArrayScreen:Array<number> = new Array<number>(numLineX);

        let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numLineX, 1,0,0);
        chart.start((line:WebglLine) => {
            DrawLine.timeShift2(line, __pool, numArrayScreen, numArrayChunkZero, numChunk);
        });
    }

    public static test_PlotTimelineFromDataPool_12L(){
        let totalData:number = 60 * 300;

        for(let i = 0; i < 12; i++){
            let numLineX:number = 10 * 300;
            let numChunk:number = 10;
            let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
            let numArrayScreen:Array<number> = new Array<number>(numLineX);

            let __pool:DataPool = new DataPool();
            __pool.addRandomData(totalData);

            let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numLineX, Math.random(), Math.random(), Math.random());
            chart.start((line:WebglLine) => {
                DrawLine.timeShift2(line, __pool, numArrayScreen, numArrayChunkZero, numChunk);
            });
        }
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