import TimeChart from './TimeChart'
import {WebglLine} from "webgl-plot";

export default class Test_TimeChart{
    public static run(){
        Test_TimeChart.test_StartStopRestart();
    }

    public static test_StartStopRestart(){
      let arrayTimeChart:Array<TimeChart> = [];

      for(let i = 0; i<12; i++){
        arrayTimeChart[i] = new TimeChart('my_canvas'+(i+1));
        arrayTimeChart[i].start((line:WebglLine) => {
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