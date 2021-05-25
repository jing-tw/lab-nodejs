'use strict';
var fs = require('fs');

const { RTCAudioSource } = require('wrtc').nonstandard;


class RTCAudioSourceWAVFile {
  constructor(options = {}) {
    options = {
      strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav',
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


    let {
      frequency,
      panning,
      strFullFilename,
    } = options;


    // let strFullFilename = '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav';
    let byteBuffer = fs.readFileSync(strFullFilename);
    let offset = 44;
    function next() {
      for (let i = 0; i < numberOfFrames; i++) {
        if (offset < byteBuffer.length - 2){
          samples[i] = byteBuffer.readInt16LE(offset);
        }else{
          //console.log('offset > byteBuffer.length - 2');
          samples[i] = 0;
          offset = 0;
        }
        offset = offset + 2; // 16-bit = 2 bytes
      }
      //console.log('frame ', cntFrame, ' samples[0] = ', samples[0]); cntFrame++;
      source.onData(data);
      // eslint-disable-next-line
      scheduled = options.schedule(next, secondsPerSample*numberOfFrames*1000 );
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


module.exports = RTCAudioSourceWAVFile;
