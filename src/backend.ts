import { stateBasic } from './fixures/basic-number-logging';
import { NodeWorker as Rng } from './nodes/random-number-generator/random-number-generator';
import { NodeWorker as Lgr} from './nodes/logger/logger';
import { FbpNodeManager } from './engine/fbp-node-manager';
import { FbpEngine } from './engine/nodejs/nodejs-engine';

console.log('XXXXXXXXXXXX ' + FbpNodeManager.asyncNode);
console.log('Backend');
const engine = new FbpEngine();

engine.register('random-number-generator', Rng);
engine.register('logger', Lgr);

engine.state = stateBasic;

// console.log(engine.getNode('log'));