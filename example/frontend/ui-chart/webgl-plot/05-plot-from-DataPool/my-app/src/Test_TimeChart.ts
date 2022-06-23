import TimeChart from './TimeChart'
import {WebglLine} from "webgl-plot";
import DataPool from './DataPool';
import DrawLine from './DrawLine';
import hrtime from 'browser-hrtime';

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
            DrawLine.timeShift(line, __pool, screen, numArrayChunkZero, numChunk);
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
                DrawLine.timeShift(line, __pool, screen, numArrayChunkZero, numChunk);
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