var fs = require('fs');
const Queue = require('@supercharge/queue-datastructure')
queue = new Queue();
// queue.enqueue(7);
// queue.enqueue(5);
// queue.enqueue(10);

// console.log('queue.size() = ', queue.size());

// var data = queue.dequeue();
// console.log('data = ', data);



var readStream = fs.createReadStream('test/audio/ch1_16bit_4k.wav');
  readStream.on('data', function (chunk) {
    console.log(chunk.length);


    // var i = 0;
    // for(i = 0; i < chunk.length; i++){
    //   queue.enqueue(chunk[i]);
    //   //console.log(i, 'enqueue:: chunk[i]', chunk[i]);
    // }

    queue.enqueue(chunk);
    console.log('testLocalWav:: queue.size() = ', queue.size());

    var arrayByteData = queue.dequeue();
    console.log('arrayByteData.length = ', arrayByteData.length);
  })