// // 
import { FbpEngine } from './engine/engine';
import { stateBasic } from './fixures/basic-number-logging';
import { NodeWorker as Rng } from './nodes/random-number-generator/random-number-generator';
import { NodeWorker as Lgr} from './nodes/logger/logger';
console.log('Backend');
const engine = new FbpEngine();

engine.register('random-number-generator', Rng);
engine.register('logger', Lgr);

engine.state = stateBasic;

// console.log(engine.getNode('log'));