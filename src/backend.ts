import { stateBasic } from './fixures/basic-number-logging';
import { FbpRandonNumberGenerator } from './nodes/random-number-generator/random-number-generator';
import { FbpLogger } from './nodes/logger/logger';
import { FbpNodeManager } from './engine/fbp-node-manager';
import { FbpEngine } from './engine/engine';

console.log('XXXXXXXXXXXX ' + FbpNodeManager.asyncNode);
console.log('Backend');
const engine = new FbpEngine();

engine.register(FbpRandonNumberGenerator);
engine.register(FbpLogger);

engine.state = stateBasic;

// console.log(engine.getNode('log'));