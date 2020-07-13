import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { stateBasic } from '../fixures/basic-number-logging';
import { findNodeBySocketId } from './state-lookups';

const should = chai.should();
chai.use(sinonChai)

describe('Utils: state-lookups', () => {
	describe('#findNodeBySocketId', () => {
		it('should find a node', () => {
			const node = findNodeBySocketId(stateBasic.nodes!, 'sock-3');
			node.id!.should.equals('log');
		});
	});
});