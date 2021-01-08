import { web } from '@scaljeri/fbp-core'; 

const { 
	setWebContext,
	setWorkerPath,
	setNodePaths,
	stateBasicAsync, 
	FbpEngine } = web;

setWebContext();
setWorkerPath('./node_modules/@scaljeri/fbp-core/dist/bundled/web-node-worker.js');
// setNodePaths({ 'random-number-generator': '/node_modules/@scaljeri/fbp-core/dist/nodes/random-number-generator.js' });
// setNodePaths({ 'random-number-generator': '../../random-number-generator.js' });
setNodePaths({ _: '/node_modules/@scaljeri/fbp-core/dist/bundled/' });

const engine = new web.FbpEngine();
engine.state = stateBasicAsync;
