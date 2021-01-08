import * as path from 'path';
import { FbpNodeManager } from '../engine/fbp-node-manager';
import { IFbpNodeWorkerStatic } from '../types/node-runner';
const DEFAULT_WORKER_NAME = '/worker.js';

import { NodeJsAsyncNodeRunner } from './nodejs-async-node-runner';


export function setWorkerPath(workerPath: string): void {
	NodeJsAsyncNodeRunner.workerPath = path.extname(workerPath) === '.js' ? workerPath : path.join(workerPath, DEFAULT_WORKER_NAME);
}

export function setNodePaths(paths: Record<string, string>): void {
	for (const key in paths) {
		NodeJsAsyncNodeRunner.nodePaths[key] = paths[key];
	}
}

export function setNodeJSContext(): void {
	FbpNodeManager.asyncNode = NodeJsAsyncNodeRunner as IFbpNodeWorkerStatic;
	setWorkerPath('/');
}

setNodeJSContext();
