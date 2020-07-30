import { IFbpNode, IFbpNodeRunner, IFbpWorkerToNodePacket } from '../types';
import { AsyncNodeRunner } from './async-node-runner';

// https://www.html5rocks.com/en/tutorials/workers/basics/

export class WebAsyncNodeRunner extends AsyncNodeRunner {
	static workerPath: string;
	static nodePaths: Record<string, string> = {};

	nodeState!: IFbpNode;

	private worker!: Worker;

	async init(nodeState: IFbpNode<unknown>): Promise<void> {
		this.nodeState = nodeState;
		console.log('INTI INIT!!!')

		return new Promise(async (resolve) => {
			console.log('WORKER:' + WebAsyncNodeRunner.workerPath);
			// https://web.dev/module-workers/
			this.worker = new Worker(WebAsyncNodeRunner.workerPath, { type: "module" });

			console.log('1XXXXX872:' + WebAsyncNodeRunner.getNodePath(nodeState.type!));
			// const { NodeRunner } = await import( /* webpackIgnore: true */ WebAsyncNodeRunner.getNodePath(nodeState.type!));
			// const clsStr = JSON.stringify(new NodeRunner);
			// console.log('CLS as str: ' + clsStr);
			// console.log('-------------------');
			this.worker.postMessage({ 
				cmd: 'init', 
				payload: { 
					path: WebAsyncNodeRunner.getNodePath(nodeState.type!)
				}
			});

			// this.worker.on('message', d => this.packet(d));
			// this.worker.on('error', (err) => this.error(err));
			// this.worker.on('exit', (code) => this.exit(code));
		});
	}

	send(packet: IFbpWorkerToNodePacket): void {
		this.worker.postMessage(packet);
	}

	private static getNodePath(type: string): string {
		return WebAsyncNodeRunner.nodePaths[type] ||
			(WebAsyncNodeRunner.nodePaths._ + `/${type}.js`).replace(/\/\//, '/');
	}


}