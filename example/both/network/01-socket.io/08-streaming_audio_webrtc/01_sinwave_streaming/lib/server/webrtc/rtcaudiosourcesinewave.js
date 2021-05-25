'use strict';

const { RTCAudioSource } = require('wrtc').nonstandard;

const twoPi = 2 * Math.PI;

class RTCAudioSourceSineWave {
  constructor(options = {}) {
    options = {
      frequency: 440,
      channelCount: 1,
      panning: null,
      sampleRate: 48000,
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
    const numberOfFrames = sampleRate / 100;             // 10 ms 量的 samples 數
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

    function next() {
      for (let i = 0; i < numberOfFrames; i++, time += secondsPerSample) {
        for (let j = 0; j < channelCount; j++) {
          samples[i * channelCount + j] = a[j] * Math.sin(twoPi * frequency * time) * maxValue;
          // samples[i * channelCount + j] = 10;
        }
      }
      source.onData(data);
      // eslint-disable-next-line
      scheduled = options.schedule(next);  // 一直不斷的執行填滿資料的工作 (一次以 10ms 的 samples 量填入)
    }

    let scheduled = options.schedule(next); // 立刻啟動第一次的填資料工作

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

module.exports = RTCAudioSourceSineWave;
