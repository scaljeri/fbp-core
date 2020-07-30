import { FbpWorkerToNodePacketsCmds } from '../constants/packets';
import { IFbpNode } from '../types/node';
import { IFbpWorkerToNodePacket } from '../types/packet';
import { IFbpInitPacket } from '../types/worker-packet';

declare var importScripts: any;
declare var DoMagic: any;

const ctx: Worker = self as any;
console.log('Hello from Worker');
ctx.addEventListener('message', async (e) => {
	const packet = e.data as IFbpWorkerToNodePacket;

	switch (packet.cmd) {
		case FbpWorkerToNodePacketsCmds.init:
			// TODO prep state with getters and setters
			const payload = (packet as IFbpInitPacket).payload;
			console.log('load file ', payload.path);
			console.log('cls: ', payload )
			const fileContent = await import(/* webpackIgnore: true */ payload.path);
			console.log('xyz');
			console.log(new fileContent.NodeRunner);
			console.log('xyz');
			// importScripts(filename)
			// console.log(DoMagic);
			//  .then((m) => {
			// 	 console.log(m.name)
			//  })
			// 	.catch(err => {
			// 		console.log('hmmmm');
			// 		console.error('Error during loading module: ' + err)
			// 	})
			// console.log(fileContent);
			// node.init(packet.payload as IFbpNode);
			break;
		case FbpWorkerToNodePacketsCmds.inputStream:
			// if (node.inputStream) {
				// const args = (packet.payload as FbpFnCallPacket).args as IFbpInputStreamArgs;
				// node.inputStream(...args);
			// }
			break;
	}

	console.log('received ', packet);
});

ctx.postMessage({ cmd: 'ready'});

// const NodeWorker = require(file).default;
// const node: IFbpNodeRunner = new NodeWorker();

// if (node.outputStream) {
// 	node.outputStream((...[data, socketId, metaData]: IFbpWorkerDataOutArgs) => {
// 		parentPort.postMessage({
// 			cmd: 'data', payload: { args: [data, socketId, metaData] }
// 		})
// 	});
// }

// parentPort.postMessage({ cmd: 'ready' });

// parentPort.on('message', (packet: IFbpWorkerToNodePacket) => {
// 	console.log('|||||||', packet);
// 	switch (packet.cmd) {
// 		case FbpWorkerToNodePacketsCmds.init:
// 			// TODO prep state with getters and setters
// 			node.init(packet.payload as IFbpNode);
// 			break;
// 		case FbpWorkerToNodePacketsCmds.inputStream:
// 			if (node.inputStream) {
// 				const args = (packet.payload as FbpFnCallPacket).args as IFbpInputStreamArgs;
// 				node.inputStream(...args);
// 			}
// 			break;
// 	}

// 	// if (data.state === 'data') {
// 	// parentPort.postMessage({ cmd: 'data', value: data.value * 2 });
// 	// }
// });

// node.init(state);
// setTimeout(() => {
	// parentPort.close();
// }, 5000);