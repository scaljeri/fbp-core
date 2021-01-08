import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { stateBasic } from '../fixtures/basic-number-logging';
import { findSocket } from './state-lookups';

const should = chai.should();
chai.use(sinonChai)

describe('Utils: state-lookups', () => {
	describe('#findSocket', () => {
		it('should find a socket', () => {
			const socket = findSocket(stateBasic.nodes!, 'sock-3');
			socket!.id!.should.equals('sock-3');
		});
	});
});