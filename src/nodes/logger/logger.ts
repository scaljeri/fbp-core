import { IFbpConnection, IFbpNode, FbpSocketId, IFbpNodeRunnerStatic, IFbpNodeRunner } from '../../types';
import { IFbpWorkerDataOut } from '../../types/worker';
import { FBP_ANY_TYPE } from '../../constants/data-types';

export interface ILoggerState {
}

export default class NodeRunner implements IFbpNodeRunner<ILoggerState> {
	static type = 'logger';

	private state!: IFbpNode<ILoggerState>;
	private output!: IFbpWorkerDataOut;
	private dataTypeCount = 0;
	private outputSocketId!: FbpSocketId;

	// Receive data from outside
	inputStream(data: unknown): void {
		console.log('Logger', data);
		if (this.output) {
			this.output(data, this.outputSocketId);
		}
	}

	// callback used to send data to outside
	outputStream(callback: IFbpWorkerDataOut): void {
		this.output = callback;
	}

	// Connection to the Node's IN socket 
	connectToInSocket(connection: IFbpConnection): void {
		this.extractDataType(connection);
	}

	// Connection to the Node's OUT socket 
	connectToOutSocket(connection: IFbpConnection): void {
		this.extractDataType(connection);
	}

	// Removed connection from IN socket
	disconnectIn(connection: IFbpConnection): void {
		this.remoteDataType(connection);
	}

	// Removed connection from OUT socket
	disconnectOut(connection: IFbpConnection): void {
		this.remoteDataType(connection);
	}

	// Called to initialize (first function that is called)
	init(state: IFbpNode<ILoggerState>) {
		this.state = state;
		this.outputSocketId = state.sockets![1].id!;
	}

	private extractDataType(connection: IFbpConnection) {
		const dataType = connection.dataType!;

		if (dataType !== FBP_ANY_TYPE) {
			if (this.dataTypeCount++ === 0) {
				this.updateSocketDataType(dataType);
			}
		}
	}

	private remoteDataType(connection: IFbpConnection) {
		const dataType = connection.dataType!;

		if (dataType !== FBP_ANY_TYPE) {
			if (--this.dataTypeCount === 0) {
				this.updateSocketDataType(dataType);
			}
		}
	}

	private updateSocketDataType(dataType: string) {
		this.state.sockets! = [
			{ ...this.state.sockets![0], dataType },
			{ ...this.state.sockets![1], dataType }];
	}
}

export { NodeRunner,  NodeRunner as FbpLogger };