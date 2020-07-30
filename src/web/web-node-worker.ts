import { FbpWorkerToNodePacketsCmds } from '../constants/packets';
import { IFbpNode } from '../types/node';
import { IFbpInputStreamArgs, IFbpNodeRunner } from '../types/node-runner';
import { FbpFnCallPacket, IFbpWorkerToNodePacket } from '../types/packet';
import { IFbpWorkerDataOutArgs } from '../types/worker';
import { IFbpInitPacket } from '../types/worker-packet';

const ctx: Worker = self as any;
let node: IFbpNodeRunner;


ctx.addEventListener('message', async (e) => {
	const packet = e.data as IFbpWorkerToNodePacket;

	switch (packet.cmd) {
		case FbpWorkerToNodePacketsCmds.init:
			// TODO prep state with getters and setters
			const payload = (packet as IFbpInitPacket).payload;
			const fileContent = await import(/* webpackIgnore: true */ payload.path);

			node = new fileContent.NodeRunner;
			node.init(payload.state);

			if (node.outputStream) {
				node.outputStream((...[data, socketId, metaData]: IFbpWorkerDataOutArgs) => {
					ctx.postMessage({
						cmd: 'data', payload: { args: [data, socketId, metaData] }
					})
				});
			}
			break;
		case FbpWorkerToNodePacketsCmds.inputStream:
			if (node && node.inputStream) {
				const args = (packet.payload as FbpFnCallPacket).args as IFbpInputStreamArgs;
				node!.inputStream(...args);
			}
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