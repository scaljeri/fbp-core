// import {
// 	setNodeJSContext,
// 	setWorkerPath,
// 	setNodePaths,
// 	stateBasicAsync,
// 	FbpEngine,
// 	FbpLogger,
// 	FbpRandonNumberGenerator } from '@scaljeri/fbp-core-nodejs'; 
import '../../../src/nodejs'; 
import { FbpEngine, stateBasic, FbpLogger, FbpRandonNumberGenerator, stateBasicAsync } from '../../../src';
import { setNodePaths, setWorkerPath } from '../../../src/nodejs';

// setNodeJSContext();
setWorkerPath('./dist/nodejs/nodejs-node-worker-esm.js');
// setNodePaths({ _: './node_modules/@scaljeri/fbp-core/dist/nodes' });
setNodePaths({ _: '../../dist/nodes' });

const engine = new FbpEngine();
engine.register(FbpLogger);
engine.register(FbpRandonNumberGenerator)
engine.state = stateBasicAsync;
