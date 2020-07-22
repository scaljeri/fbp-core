// worker.js
const { parentPort, workerData } = require("worker_threads");

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