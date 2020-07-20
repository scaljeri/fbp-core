import 'mocha';
import * as chai from 'chai';
// import * as sinonChai from 'sinon-chai';

import * as sinon from 'sinon';

import { FbpConnection } from './fbp-connection';
import { FbpStreams } from './fbp-streams';

const should = chai.should();
// chai.use(sinonChai);

describe('DataEngine', () => {
	let connection: FbpConnection;
	let mockedStreams: any;

	let from: any;
	let to: any;

	beforeEach(() => {
		from = { subscribe: () => {}};
		to = { emit: () => {} };

			// produce: sinon.fake.returns(producer),
			// consume: sinon.fake.returns(consumer.asObservable()),
			// unsubscribe: sinon.fake()
		// } as any as FbpStreams;

		connection = new FbpConnection(from, to, {} as any);
	});

	// it('should instantiate', () => {
	// 	should.exist(connection);
	// });

	// it('should do nothing on destroy', () => {
	// 	connection.destroy();

	// 	mockedStreams.unsubscribe.should.not.have.been.called;
	// });

	// describe('#connect', () => {
	// 	let value: number;

	// 	beforeEach(() => {
	// 		connection.connect('in', 'out');

	// 		producer.subscribe(val => value = val);
	// 	});

	// 	it('should consume', () => {
	// 		mockedStreams.consume.should.have.been.calledOnce;
	// 		mockedStreams.consume.should.have.been.calledWith('in');
	// 	});

	// 	it('should produce', () => {
	// 		mockedStreams.produce.should.have.been.calledOnce;
	// 		mockedStreams.produce.should.have.been.calledWith('out');
	// 	});

	// 	it('should pass through incoming values', () => {
	// 		consumer.next(99);

	// 		value.should.equal(99);
	// 	});
	// });

	// describe('#destroy', () => {
	// 	beforeEach(() => {
	// 		connection.connect('in', 'out');
	// 	});

	// 	it('should destroy', () => {
	// 		connection.destroy();

	// 		mockedStreams.unsubscribe.should.have.been.calledOnce;
	// 		mockedStreams.unsubscribe.getCall(0).args[0].should.equal('in');
	// 		mockedStreams.unsubscribe.getCall(0).args[1].should.equal('out');
	// 	});

	// 	it('should only apply destroy once', () => {
	// 		connection.destroy();
	// 		connection.destroy();

	// 		mockedStreams.unsubscribe.should.have.been.calledOnce;
	// 	});
	// })
});
