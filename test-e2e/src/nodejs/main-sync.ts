import '../../../src/nodejs'; 
import { FbpEngine, stateBasic, FbpLogger, FbpRandonNumberGenerator } from '../../../src';

const engine = new FbpEngine();
engine.register(FbpLogger);
engine.register(FbpRandonNumberGenerator)
engine.state = stateBasic;
