var Queue = require('./serverqueue');

Queue.enqueue('test');
console.log(Queue.dequeue());