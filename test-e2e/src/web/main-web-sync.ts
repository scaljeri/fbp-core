import { web } from '@scaljeri/fbp-core';

const {
	setWebContext,
	stateBasic,
	FbpEngine,
	FbpLogger,
	FbpRandonNumberGenerator } = web;

setWebContext();

const engine = new FbpEngine();
engine.register(FbpLogger);
engine.register(FbpRandonNumberGenerator)
engine.state = stateBasic;

export {engine};