import 'mocha';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import { FbpEngine } from './engine';
import { IFbpState } from '../types/state';
import { createUID } from '../utils/unique-id';
import { FbpSocketTypes, FbpSocketPositions } from '../constants/socket.enum';
import { FbpSocketId } from '../types/socket';
import { IFbpNode } from '../types/node';
import { stateBasic } from '../fixtures/basic-number-logging';
import { FbpNodeManager } from './fbp-node-manager';

const should = chai.should();
chai.use(sinonChai);

const states  = {
	get empty() { return {} },
	get minimal() { return  { name: 'state', connections: {}, nodes: {}} as any },
	simple(a: string, b: string, aa = a) { 
		const s = this.minimal;
		s.nodes[a] = {id: aa || a};
		s.nodes[b] = { id: b};

		return s;
	 }
};

describe('FbpEngine', () => {
	let engine: FbpEngine;

	beforeEach(() => {
		engine = new FbpEngine();
		FbpNodeManager.NodeClasses['random-number-generator'] = function() { 
			this.init = () => {}, this.addSockets = () => {}}
		FbpNodeManager.NodeClasses['logger'] = function() { 
			this.init = () => {}, this.addSockets = () => {}}
	});

	describe('#set/get state', () => {
		it('should initialy have no state', () => {
			should.not.exist(engine.state);
		});

		it('should have a state if set', () => {
			engine.state = stateBasic;
			engine.state.should.eqls(stateBasic);
		});

		// it('should remove old nodes/sockets on new state', () => {
		// 	engine.state = states.simple('a', 'b');
		// 	engine.state = states.simple('x', 'y');

		// 	should.not.exist(engine.state.nodes!.a);
		// 	should.not.exist(engine.state.nodes!.b);
		// 	should.exist(engine.state.nodes!.x);
		// 	should.exist(engine.state.nodes!.y);
		// });

		// it('should detect a key vs nodeId mismatch', () => {
		// 	const state = states.simple('a', 'b', 'c');

		// 	(function () {
		// 		engine.state = state;
		// 	})['should'].throw(`Node ${state.nodes.a.id} has incorrect key in 'nodes' object`);
		// })
	});

	// describe('#addNode', () => {
	// 	it('should throw an error if no state is set first', () => {
	// 		(function () {
	// 			engine.addNode({x: 'x'} as any);
	// 		})['should'].throw('Cannot create a node without a state');
	// 	});

	// 	describe('With state', () => {
	// 		beforeEach(() => {
	// 			engine.state = states.empty;
	// 		});

	// 		it('should add new node with id', () => {
	// 			const node = engine.addNode({ id: 'x'});
	// 			engine.getNode('x')!.should.eqls(node);
	// 		});

	// 		it('should add a node without id', () => {
	// 			const charCount = (createUID().match(/-/g) || []).length;

	// 			const node = engine.addNode({});

	// 			(node.id!.match(/-/g) ||[]).length.should.equals(charCount);
	// 		});

	// 		it('should add a new node to the state object', () => {
	// 			const node = engine.addNode({} as any);
	// 			const newNodeA = engine.getNode(node.id!);
	// 			const newNodeB = engine.state.nodes![node.id!];

	// 			should.exist(newNodeA);
	// 			should.exist(newNodeB);

	// 			newNodeA!.should.eqls(newNodeB);
	// 		});
	// 	});
	// });

	// describe('Sockets', () => {
	// 	describe('Add with #state', () => {
	// 		beforeEach(() => {
	// 			// engine.state = states.complete;
	// 		})
	// 	});

	// 	describe('Add with #addNode', () => {

	// 	});
	// });

	// describe('#addConnection', () => {

	// });
});