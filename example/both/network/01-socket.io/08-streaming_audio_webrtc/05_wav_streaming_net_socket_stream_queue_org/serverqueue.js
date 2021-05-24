var Queue = require('queue-fifo');

class ServerQueue {
    constructor(options = {}) {
        options = {
          ...options
        };

        this._queue = new Queue();
    }

    enqueue(bufferFrame) {
        console.log('enqueue:: bufferFrame.length = ', bufferFrame.length);
		this._queue.enqueue(bufferFrame);
    }
    dequeue(){
        let bufferFrame = this._queue.dequeue();
        console.log('dequeue:: byteBuffer.length = ', bufferFrame.length); // 160 bytes
		return bufferFrame;
	}
	
	getSize(){
		return this._queue.size();
	}
}

// function testEnqueue() {
// 	let queue = new ServerQueue();
// 	let byteBuffer = Buffer.from([ 8, 6, 7, 5, 3, 0, 257]);
// 	console.log('byteBuffer = ', byteBuffer);
// 	queue.enqueue(byteBuffer);
// 	console.log('queue size = ', queue.getSize());
// 	let data = queue.dequeue();
// 	console.log('data = ', data);

// 	data = queue.dequeue();
// 	console.log('data = ', data);
// }

// testEnqueue();

module.exports = new ServerQueue();