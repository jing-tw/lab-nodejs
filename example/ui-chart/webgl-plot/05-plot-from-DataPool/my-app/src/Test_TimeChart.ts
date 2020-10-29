import TimeChart from './TimeChart'
import {WebglLine} from "webgl-plot";
import DataPool from './DataPool';

import hrtime from 'browser-hrtime';


class DrawLine{
    public static timeShift(line:WebglLine, __pool:DataPool, screen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number,){
        let numArrayChunk:Array<number>;
        if(__pool.getCapacity() < numChunk){
            numArrayChunk = numArrayChunkZero;
        }else{
            numArrayChunk = __pool.removeArrayData(numChunk);
        }

        screen = screen.concat(numArrayChunk); // [ screen + new data]
        screen = screen.slice(numChunk); // [ old ] + [screen]

        for (let i = 0; i < line.numPoints; i++) {
            line.setY(i, screen[i]);
        }
        return screen;
    }

    public static timeShift2(line:WebglLine, __pool:DataPool, screen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number,){
        let numArrayChunk:Array<number>;
        if(__pool.getCapacity() < numChunk){
            numArrayChunk = numArrayChunkZero;
        }else{
            //let start:[number, number] = hrtime();

            numArrayChunk = __pool.removeArrayData(numChunk);

            // const diff:[number, number] = hrtime(start);
            // let dur:bigint = BigInt(diff[0] * 1e9 + diff[1]);
            // console.log('Benchmark tool diff = ', diff);
            // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 6))} milliseconds.`);
            // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 9))} seconds.`);
        }

        // let start:[number, number] = hrtime();

        screen.splice(0, numChunk); // remove the first numChunk's data
        screen.splice(-1, 0, ...numArrayChunk); // append numArrayChunk

        // const diff:[number, number] = hrtime(start);
        // let dur:bigint = BigInt(diff[0] * 1e9 + diff[1]);
        // console.log('Benchmark tool diff = ', diff);
        // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 6))} milliseconds.`);
        // console.log(`Benchmark took ${dur/BigInt(Math.pow(10, 9))} seconds.`);

        for (let i = 0; i < line.numPoints; i++) {
            line.setY(i, screen[i]);
        }
        return screen;
    }

    public static drawDataLeftRight(line:WebglLine, __pool:DataPool, screen:Array<number>, numArrayChunkZero:Array<number>, numChunk:number, scanX:number[]){
        let numArrayChunk:Array<number>;

        if(__pool.getCapacity() < numChunk){
            numArrayChunk = numArrayChunkZero;
        }else{
            numArrayChunk = __pool.removeArrayData(numChunk);
        }

        // update screen
        screen.splice(scanX[0], numArrayChunk.length, ...numArrayChunk);
        if (scanX[0] + numArrayChunk.length < screen.length){
            scanX[0] = scanX[0] + numArrayChunk.length;
        }else{
            scanX[0] = 0;
        }
        
        for (let i = 0; i < screen.length; i++) {
            line.setY(i, screen[i]);
        }
    }
}

export default class Test_TimeChart{
    public static run(){
        // Test_TimeChart.test_StartStopRestart(); // ok
        // Test_TimeChart.test_PlotTimelineFromDataPool_v2(); // ok
        // Test_TimeChart.test_PlotTimelineFromDataPool_12L();  // ok
        // Test_TimeChart.test_PlotTimelineFromDataPool_12L_leftright(); // ok
        Test_TimeChart.runAllTest();
    }
    public static runAllTest(){
        Test_TimeChart.test_StartStopRestart(); // ok
        Test_TimeChart.test_PlotTimelineFromDataPool_v2(); // ok
        Test_TimeChart.test_PlotTimelineFromDataPool_12L();  // ok
        Test_TimeChart.test_PlotTimelineFromDataPool_12L_leftright(); // ok
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

    public static test_PlotTimelineFromDataPool_v1(){
        let __pool:DataPool = new DataPool();
        let totalData:number = 60 * 300;
        __pool.addRandomData(totalData);

        let i:number = 0;

        let numScreenWidth:number = 10 * 300;
        let numChunk:number = 10;
        let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
        let screen:Array<number> = new Array<number>(numScreenWidth);

        let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numScreenWidth, 1,0,0);
        chart.start((line:WebglLine) => {
            screen = DrawLine.timeShift(line, __pool, screen, numArrayChunkZero, numChunk);
        });
    }
    public static test_PlotTimelineFromDataPool_v2(){
        let __pool:DataPool = new DataPool();
        let totalData:number = 60 * 300;
        // __pool.addRandomData(totalData);
        const numFreq = 0.001;
        const numAmp = 0.5;
        const numNoise = 0;
        __pool.addSinData(totalData, numFreq, numAmp, numNoise);

        let i:number = 0;

        let numScreenWidth:number = 10 * 300;
        let numChunk:number = 100;
        let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
        let screen:Array<number> = new Array<number>(numScreenWidth);

        let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numScreenWidth, 1,0,0);
        chart.start((line:WebglLine) => {
            DrawLine.timeShift2(line, __pool, screen, numArrayChunkZero, numChunk);
        });
    }

    public static test_PlotTimelineFromDataPool_12L(){
        let totalData:number = 60 * 300;

        for(let i = 0; i < 12; i++){
            let numScreenWidth:number = 10 * 300;
            let numChunk:number = 40;
            let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
            let screen:Array<number> = new Array<number>(numScreenWidth);

            let __pool:DataPool = new DataPool();
            const numFreq = 0.001;
            const numAmp = 0.5;
            const numNoise = 0;
            __pool.addSinData(totalData, numFreq, numAmp, numNoise);

            let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numScreenWidth, Math.random(), Math.random(), Math.random());
            chart.start((line:WebglLine) => {
                DrawLine.timeShift2(line, __pool, screen, numArrayChunkZero, numChunk);
            });
        }
    }

    public static test_PlotTimelineFromDataPool_12L_leftright(){
        let totalData:number = 60 * 300;

        for(let i = 0; i < 12; i++){
            let numScreenWidth:number = 40 * 300;
            let numChunk:number = 30;
            let numArrayChunkZero:Array<number> = new Array<number>(numChunk).fill(0);
            let screen:Array<number> = new Array<number>(numScreenWidth).fill(-1);

            let __pool:DataPool = new DataPool();
            const numFreq = 0.001;
            const numAmp = 0.5;
            const numNoise = 0;
            __pool.addSinData(totalData, numFreq, numAmp, numNoise);

            let chart:TimeChart = new TimeChart('my_canvas'+(i+1), numScreenWidth, Math.random(), Math.random(), Math.random());
            let scanX:number[] = [1].fill(0);
            chart.start((line:WebglLine) => {
                DrawLine.drawDataLeftRight(line, __pool, screen, numArrayChunkZero, numChunk, scanX);
            });
        }
    }
  }