'use strict';

const RTCAudioSourceWAVFile = require('../../lib/server/webrtc/rtcaudiosourcewavefile');

function test_wave_16bit_8k(){
  return new RTCAudioSourceWAVFile({strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_8k.wav', sampleRate: 8000});
}

function test_wave_16bit_22k(){
  return new RTCAudioSourceWAVFile({strFullFilename: '../sample_audio/ImperialMarch60_mono_signed_16bit_pcm_22k.wav', sampleRate: 22000});
}

function beforeOffer(peerConnection) {
  // const source = test_wave_16bit_8k();
  const source = test_wave_16bit_22k();
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
}

module.exports = { beforeOffer };
