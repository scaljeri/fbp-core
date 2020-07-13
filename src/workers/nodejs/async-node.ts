const { workerData, parentPort } = require('worker_threads')

const filename = workerData.file;
import(workerData.file).then((mod: any) => {
	const instance = new mod.NodeWorker();
	console.log("YES ", instance);
	parentPort.postMessage({ status: 'ready'});
});

// parentPort.postMessage({ hello:  })