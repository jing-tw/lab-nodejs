var fs = require('fs');
var wav = require('wav');

strFullFilename = './ImperialMarch60_mono_signed_16bit_pcm_8k.wav';
var file = fs.createReadStream(strFullFilename);
var reader = new wav.Reader();
 
// the "format" event gets emitted at the end of the WAVE header
reader.on('format', function (format) {
  console.log('format = ', format)
});

reader.once('readable', function () {
    console.log('WaveHeader Size:\t%d', 12);
    console.log('ChunkHeader Size:\t%d', 8);
    console.log('FormatChunk Size:\t%d', reader.subchunk1Size);
    console.log('RIFF ID:\t%s', reader.riffId);
    console.log('Total Size:\t%d', reader.chunkSize);
    console.log('Wave ID:\t%s', reader.waveId);
    console.log('Chunk ID:\t%s', reader.chunkId);
    console.log('Chunk Size:\t%d', reader.subchunk1Size);
    console.log('Compression format is of type: %d', reader.audioFormat);
    console.log('Channels:\t%d', reader.channels);
    console.log('Sample Rate:\t%d', reader.sampleRate);
    console.log('Bytes / Sec:\t%d', reader.byteRate);
    console.log('wBlockAlign:\t%d', reader.blockAlign);
    console.log('Bits Per Sample Point:\t%d', reader.bitDepth);
    // TODO: this should end up being "44" or whatever the total length of the WAV
    //       header is. maybe emit "format" at this point rather than earlier???
    console.log('wavDataPtr: %d', 0);
    console.log('wavDataSize: %d', reader.subchunk2Size);
    console.log();
  });
 
// pipe the WAVE file to the Reader instance
file.pipe(reader);

