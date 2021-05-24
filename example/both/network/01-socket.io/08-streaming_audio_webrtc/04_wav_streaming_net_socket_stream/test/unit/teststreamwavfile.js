var fs = require('fs');

class TestStreamWAVFile {
	constructor(options = {}) {
		options = {
		  strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav',
		  channelCount: 1,
		  sampleRate: 8000,//22050, //48000,
		  schedule: setTimeout,
          unschedule: clearTimeout,
          socketClient: null,
		  ...options
    };
    const {strFullFilename, sampleRate, channelCount, schedule, socketClient} = options;
    if (socketClient === null){
        throw 'Error: client is null.';
    }
    const bitsPerSample = 16;
    const intBytePerSample = bitsPerSample/8;
    const numberOfFrames = sampleRate / 100;
    const secondsPerSample = 1 / sampleRate;
    const samples = new Int16Array(channelCount * numberOfFrames);
    const lengthBufDataPerFrame = numberOfFrames*channelCount*intBytePerSample;
    let offset = 44;


	  function testWriteWavFileNext(byteBuffer) {
      // const buf = Buffer.alloc(5, 'a');
      // socketClient.write(buf);

      let bufData;
      if (offset + lengthBufDataPerFrame < byteBuffer.length){
        bufData = byteBuffer.slice(offset, offset + lengthBufDataPerFrame);
        offset = offset + lengthBufDataPerFrame;
      }else{
        bufData = new Buffer(lengthBufDataPerFrame);
        offset = 44;
      }

      socketClient.write(bufData);
      console.log('length = ', bufData.length);
      console.log('send = ', bufData);
		  
		  // for (let i = 0; i < numberOfFrames; i++) {
		  //   if (offset < byteBuffer.length - 2){
		  // 	  samples[i] = byteBuffer.readInt16LE(offset);
		  //   }else{
		  // 	  samples[i] = 0;
		  // 	  offset = 44;
		  //   }
		  //   offset = offset + 2; // 16-bit = 2 bytes
      // }
      // socketClient.write(samples);
      // console.log('length = ', samples.length);
      // console.log('send = ', samples);

      // eslint-disable-next-line
      let intDelayInms = secondsPerSample*numberOfFrames*1000;
		  let scheduled = schedule(testWriteWavFileNext.bind(null, byteBuffer), intDelayInms);
    } // end of testWriteWavFileNext
    
    this.start_ =  function(){
      var byteBuffer = fs.readFileSync(strFullFilename);
      let scheduled = schedule(testWriteWavFileNext.bind(null, byteBuffer));
    }

  } // end of contructor
  
  start(){
    this.start_();
  }

}

// Usage
// var tester = new TestStreamWAVFile();
// tester.start()
module.exports = TestStreamWAVFile;