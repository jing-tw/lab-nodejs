import {WebglLine} from "webgl-plot";
import DataPool from './DataPool';

export default class DrawLine{
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