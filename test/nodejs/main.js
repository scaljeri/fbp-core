const { Worker } = require('worker_threads')

const workerData = { file: './dist/nodes/random-number-generator.js' };

const worker = new Worker('./worker.js', { workerData })
worker.on('message', d => {
	console.log('received: ', d);
});

worker.on('error', (err) => { console.log(err)})
worker.on('exit', code => {
  if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
})
