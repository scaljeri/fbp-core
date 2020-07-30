import * as path from 'path';
import { FbpNodeManager } from './engine/fbp-node-manager';
import { NodeJsAsyncNodeRunner } from './engine/nodejs-async-node-runner';
import { IFbpNodeWorkerStatic } from './types/node-runner';

const DEFAULT_WORKER_NAME = '/worker.js';


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

export * from './nodejs';
export * from './nodes';
export * from './constants';
export * from './engine';
export * from './engine/nodejs-async-node-runner';
export * from './fixures';
export * from './types';
export * from './utils';
