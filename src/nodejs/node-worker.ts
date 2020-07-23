// worker.js
const { parentPort, workerData } = require("worker_threads");

require = require('esm')(module)

const { file } = workerData as { file: string };

const { NodeWorker } = require(file)

const node = new NodeWorker();

console.log('worker: ', workerData);

parentPort.postMessage({ state: 'ready' });

parentPort.on('message', (data: any) => {
	if (data.state === 'data') {
		parentPort.postMessage({ state: 'data', value: data.value * 2 });
	}
});

setTimeout(() => {
	parentPort.close();
}, 5000);