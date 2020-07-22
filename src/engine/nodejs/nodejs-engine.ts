import { IFbpNodeWorkerStatic } from '../../types';
import { FbpNodeManager } from '../fbp-node-manager';
import { AsyncNodeRunner } from './async-node-runner';
import * as path from 'path';

const DEFAULT_WORKER_NAME = '/worker.js';

FbpNodeManager.asyncNode = AsyncNodeRunner as IFbpNodeWorkerStatic ;
AsyncNodeRunner.workerPath = DEFAULT_WORKER_NAME;

export function setWorkerPath(workerPath: string): void {
	AsyncNodeRunner.workerPath = path.extname(workerPath) === '.js' ? workerPath : path.join(workerPath, DEFAULT_WORKER_NAME);
}

export function setNodePath(nodePath: string): void {
	AsyncNodeRunner.nodePath = nodePath;
}

export function setNodePaths(paths: Record<string, string>): void {
	for(const key in paths) {
		AsyncNodeRunner.nodePaths[key] = paths[key];
	}
}

export * from '../engine';