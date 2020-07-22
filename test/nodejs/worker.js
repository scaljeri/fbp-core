require('@babel/register')({
  presets: ['@babel/preset-env']
})

const { workerData, parentPort } = require('worker_threads')

// You can do any heavy stuff here, in a synchronous way
// without blocking the "main thread"


const { NodeWorker } = require('./random-number-generator');

const rng = new NodeWorker();

rng.init({ sockets: [{id: 'xyz'}]});

rng.outputStream(val => {
	parentPort.postMessage({ data: val })
	// console.log('received ', val);
});