'use strict';
var fs = require('fs');

const { RTCAudioSource } = require('wrtc').nonstandard;

const twoPi = 2 * Math.PI;



class RTCAudioSourceSineWave {
  constructor(options = {}) {
    options = {
      frequency: 440,
      channelCount: 1,
      panning: null,
      sampleRate: 8000,//22050, //48000,
      schedule: setTimeout,
      unschedule: clearTimeout,
      ...options
    };

    
    const {
      channelCount,
      sampleRate
    } = options;

    if (channelCount !== 1 && channelCount !== 2) {
      throw new Error('channelCount must be 1 or 2');
    }

    const bitsPerSample = 16;
    const maxValue = Math.pow(2, bitsPerSample) / 2 - 1;
    const numberOfFrames = sampleRate / 100;
    const secondsPerSample = 1 / sampleRate;
    const source = new RTCAudioSource();
    const samples = new Int16Array(channelCount * numberOfFrames);

    const data = {
      samples,
      sampleRate,
      bitsPerSample,
      channelCount,
      numberOfFrames
    };

    const a = [1, 1];

    let {
      frequency,
      panning
    } = options;

    let time = 0;

    let strFullFilename = '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav';
    let byteBuffer = fs.readFileSync(strFullFilename);
    
    let offset = 44;
    let cntFrame = 0;
    function next() {
      

      for (let i = 0; i < numberOfFrames; i++) {
        if (offset < byteBuffer.length - 2){
          //var value = byteBuffer.readInt16LE(offset);
          //samples[i] = value;
          samples[i] = byteBuffer.readInt16LE(offset);
        }else{
          //console.log('offset > byteBuffer.length - 2');
          samples[i] = 0;
          offset = 0;
        }
        offset = offset + 2;
      }
     
      // work
      // for (let i = 0; i < numberOfFrames; i++, time += secondsPerSample) {
      //   for (let j = 0; j < channelCount; j++) {
      //     samples[i * channelCount + j] = a[j] * Math.sin(twoPi * frequency * time) * maxValue;
      //   }
      // }

      // work
      // for (let i = 0; i < numberOfFrames; i++, time += secondsPerSample) {
      //     samples[i * channelCount] = a[0] * Math.sin(twoPi * frequency * time) * maxValue;
      //   }
      

      //console.log('frame ', cntFrame, ' samples[0] = ', samples[0]); cntFrame++;
      source.onData(data);
      // eslint-disable-next-line
      scheduled = options.schedule(next, secondsPerSample*numberOfFrames*1000);
    }

    let scheduled = options.schedule(next);

    this.close = () => {
      options.unschedule(scheduled);
      scheduled = null;
    };

    this.createTrack = () => {
      return source.createTrack();
    };

    this.setFrequency = newFrequency => {
      frequency = newFrequency;
    };

    this.setPanning = newPanning => {
      if (channelCount === 1) {
        return;
      }
      panning = newPanning;
      a[0] = 1 - (panning / 100);
      a[1] = 1 - ((100 - panning) / 100);
    };

    this.setPanning(panning);

    Object.defineProperties(this, {
      frequency: {
        get() {
          return frequency;
        }
      },
      panning: {
        get() {
          return panning;
        }
      }
    });
  }
}


// class RTCAudioSourceSineWave {
//   constructor(options = {}) {
//     options = {
//       channelCount: 1,
//       panning: null,
//       sampleRate: 8000, //22050, //48000,
//       schedule: setTimeout,
//       unschedule: clearTimeout,
//       ...options
//     };

    
//     const {
//       channelCount,
//       sampleRate
//     } = options;

//     const bitsPerSample = 16;
//     const numberOfFrames = sampleRate / 100;
//     const source = new RTCAudioSource();
//     const samples = new Int16Array(channelCount * numberOfFrames);

//     const data = {
//       samples,
//       sampleRate,
//       bitsPerSample,
//       channelCount,
//       numberOfFrames
//     };

//     let {
//       frequency,
//       panning
//     } = options;

//     let strFullFilename = './ImperialMarch60_mono_signed_16bit_pcm_8k.wav';
//     let byteBuffer = fs.readFileSync(strFullFilename);
    
//     let offset = 44;
//     let cntFrame = 0;
//     function next() {
//       for (let i = 0; i < numberOfFrames; i++) {
//         if (offset < byteBuffer.length - 2){
//           samples[i] = byteBuffer.readInt16LE(offset) & 0xffff;
//           console.log('offset = ', offset);
//         }else{
//           console.log('====================================== offset > byteBuffer.length - 2');
//           samples[i] = 0;
//           offset = 0;
//         }
//         offset = offset + 2;
//       }

//       console.log('frame ', cntFrame, ' samples[0] = ', samples[0]); cntFrame++;
//       source.onData(data);
//       // eslint-disable-next-line
//       scheduled = options.schedule(next);
//     }

//     let scheduled = options.schedule(next);

//     this.close = () => {
//       options.unschedule(scheduled);
//       scheduled = null;
//     };

//     this.createTrack = () => {
//       return source.createTrack();
//     };

//     this.setFrequency = newFrequency => {
//       frequency = newFrequency;
//     };

//     this.setPanning = newPanning => {
//       if (channelCount === 1) {
//         return;
//       }
//       panning = newPanning;
//       a[0] = 1 - (panning / 100);
//       a[1] = 1 - ((100 - panning) / 100);
//     };

//     this.setPanning(panning);

//     Object.defineProperties(this, {
//       frequency: {
//         get() {
//           return frequency;
//         }
//       },
//       panning: {
//         get() {
//           return panning;
//         }
//       }
//     });
//   }
// }



module.exports = RTCAudioSourceSineWave;
