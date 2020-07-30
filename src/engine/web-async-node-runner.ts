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

		return new Promise(async (resolve) => {
			console.log('WORKER:' + WebAsyncNodeRunner.workerPath);
			// https://web.dev/module-workers/
			this.worker = new Worker(WebAsyncNodeRunner.workerPath, { type: "module" });

			this.worker.postMessage({ 
				cmd: 'init', 
				payload: { 
					path: WebAsyncNodeRunner.getNodePath(nodeState.type!),
					state: nodeState
				}
			});

			this.worker.addEventListener('message', (d: MessageEvent) => this.packet(d.data));
			this.worker.addEventListener('error', (err) => this.error(err));
			this.worker.addEventListener('exit', (code) => this.exit(code));
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