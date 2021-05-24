'use strict';
var fs = require('fs');

const RTCAudioSourceSineWave = require('../../lib/server/webrtc/rtcaudiosourcesinewave');
const Queue = require('@supercharge/queue-datastructure');

function beforeOffer(peerConnection) {
  var queue = new Queue();
  const source = new RTCAudioSourceSineWave(queue);
  const track = source.createTrack();
  peerConnection.addTrack(track);

  const dataChannel = peerConnection.createDataChannel('frequency');

  function onMessage({ data }) {
    const frequency = Number.parseFloat(data);
    source.setFrequency(frequency);
  }

  dataChannel.addEventListener('message', onMessage);

  // NOTE(mroberts): This is a hack so that we can get a callback when the
  // RTCPeerConnection is closed. In the future, we can subscribe to
  // "connectionstatechange" events.
  const { close } = peerConnection;
  peerConnection.close = function() {
    dataChannel.removeEventListener('message', onMessage);
    track.stop();
    source.close();
    return close.apply(this, arguments);
  };


  // test local wave source
  testLocalWav(queue);
}

function testLocalWav(queue) {
  var readStream = fs.createReadStream('test/audio/signed_16bit_pcm_mono_4k.wav'); // ch1_16bit_4k.wav');
  readStream.on('data', function (chunk) {
    console.log(chunk.length);


    // var i = 0;
    // for(i = 0; i < chunk.length; i++){
    //   queue.enqueue(chunk[i]);
    //   //console.log(i, 'enqueue:: chunk[i]', chunk[i]);
    // }

    queue.enqueue(chunk);
    console.log('testLocalWav:: queue.size() = ', queue.size());

  })
}

module.exports = { beforeOffer };
