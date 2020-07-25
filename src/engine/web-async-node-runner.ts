import { IFbpNode, IFbpNodeRunner } from '../types';

// https://www.html5rocks.com/en/tutorials/workers/basics/

export class AsyncNodeRunner implements IFbpNodeRunner {
	static workerPath = '/web/web-node-worker.js';
	static nodePaths: Record<string, string> = {};

	init(state: IFbpNode<any>): void {
		throw new Error('Web Async node: Method not implemented.');
	}

}