import { FbpNodeManager } from './engine/fbp-node-manager';
import { AsyncNodeRunner } from './engine/web-async-node-runner';
import { IFbpNodeWorkerStatic } from './types/node-runner';

const DEFAULT_WORKER_NAME = '/worker.js'

FbpNodeManager.asyncNode = AsyncNodeRunner as IFbpNodeWorkerStatic;

// TODO: use this for nodejs as well and share it after nodejs and web are working 
const path = {
	extname: (filename: string) => {
		return (filename.match(/(\.[^.]+)$/) || [])[0];
	},
	join: (pathA: string, pathB: string) => {
		return `${pathA}/${pathB}`.replace(/\/\//g, '/');
	}
}

export function setWorkerPath(workerPath: string): void {
	AsyncNodeRunner.workerPath = path.extname(workerPath) === '.js' ? workerPath : path.join(workerPath, DEFAULT_WORKER_NAME);
}

export function setNodePath(nodePath: string, type: string = '_'): void {
	AsyncNodeRunner.nodePaths[type] = nodePath;
}

export function setNodePaths(paths: Record<string, string>): void {
	for (const key in paths) {
		setNodePath(paths[key], key);
	}
}

export * from './constants';
export * from './engine';
export * from './fixures';
export * from './types';
export * from './utils';