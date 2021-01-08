import { FbpNodeManager } from '../engine';
import { WebAsyncNodeRunner } from '../engine/web-async-node-runner';
import { IFbpNodeWorkerStatic } from '../types';

const DEFAULT_WORKER_NAME = '/worker.js'

FbpNodeManager.asyncNode = WebAsyncNodeRunner as IFbpNodeWorkerStatic;

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
	WebAsyncNodeRunner.workerPath = path.extname(workerPath) === '.js' ? workerPath : path.join(workerPath, DEFAULT_WORKER_NAME);
}

export function setNodePath(nodePath: string, type: string = '_'): void {
	WebAsyncNodeRunner.nodePaths[type] = nodePath;
}

export function setNodePaths(paths: Record<string, string>): void {
	for (const key in paths) {
		setNodePath(paths[key], key);
	}
}

export function setWebContext(): void {
	setWorkerPath('/');
}
