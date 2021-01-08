import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import { stateBasic } from '../fixtures/basic-number-logging';
import { IFbpState } from '../types';
import { cloneAndFixState, cloneAndFixSocket, cloneAndFixConnection } from './fix-state';
import { FbpSocketTypes, FbpSocketPositions } from '../constants';

const should = chai.should();
chai.use(sinonChai)

describe('Utils: fix-state', () => {
	let state: IFbpState;


	describe('#cloneAndFixState', () => {
		describe('full state', () => {
			beforeEach(() => {
				state = cloneAndFixState(stateBasic);
			});

			it('should clone the whole state', () => {
				state.should.eqls(stateBasic);
			});
		})
		describe('empty state', () => {
			beforeEach(() => {
				state = cloneAndFixState({});
			});

			it('should fix the empty state', () => {
				state.should.eqls({
					nodes: [], connections: []
				});
			});
		});

		describe('with nodes', () => {
			beforeEach(() => {
				state = cloneAndFixState({ nodes: [{ id: 'x' }] });
			});

			it('should fix an emtpy node', () => {
				state.should.eqls({
					nodes: [
						{
							id: 'x', sockets: [],
							ui: { position: { left: 0, top: 0 } }
						}
					], connections: []
				});
			});
		});

		describe('with empty connections', () => {
			beforeEach(() => {
				state = cloneAndFixState({ connections: [{
					id: 'x', from: 'a', to: 'b'}] as any });
			});

			it('should fix an emtpy connection array', () => {
				state.should.eqls({
					nodes: [],
					connections: [] as any
				});
			});
		});
	});

	describe('#cloneAndFixSocket', () => {
		it('should add id if not present', () => {
			const sock = cloneAndFixSocket({ type: FbpSocketTypes.IN });
			should.exist(sock.id);
		});

		it('should auto position an IN socket', () => {
			const sock = cloneAndFixSocket({ type: FbpSocketTypes.IN });
			sock.side!.should.equals(FbpSocketPositions.LEFT);
		});

		it('should auto position an OUT socket', () => {
			const sock = cloneAndFixSocket({ type: FbpSocketTypes.OUT });
			sock.side!.should.equals(FbpSocketPositions.RIGHT);
		});

		it('should not position an INTERN socket', () => {
			const sock = cloneAndFixSocket({ type: FbpSocketTypes.INTERN });
			should.not.exist(sock.side);
		});
	});

	describe('#cloneAndFixConnection', () => {
		it('should fix an empty connection', () => {
			const conn = cloneAndFixConnection({from: 'x', to: 'y', dataType: 'num'});
			should.exist(conn.id);
			should.not.exist(conn.fromNodeId);
			should.not.exist(conn.toNodeId);
		});

		it('should fix missing node IDs', () => {
			const conn = cloneAndFixConnection({ from: 'sock-1', to: 'sock-2' }, stateBasic.nodes);
			conn.fromNodeId!.should.equals('rnd');
			conn.toNodeId!.should.equals('log');
		})
	});
});