import { IFbpNodeWorker } from '../../types/node-worker';
import { IFbpConnection, IFbpNode, FbpSocketId } from '../../types';
import { IFbpWorkerDataOut } from '../../types/worker';
import { FBP_ANY_TYPE } from '../../constants/data-types';

export interface ILoggerState {
}

export class NodeWorker implements IFbpNodeWorker<ILoggerState> {
	private state!: IFbpNode<ILoggerState>;
	private output!: IFbpWorkerDataOut;
	private dataTypeCount = 0;
	private outputSocketId!: FbpSocketId;

	inputStream(data: unknown): void {
		console.log('Logger', data);
		if (this.output) {
			this.output(data, this.outputSocketId);
		}
	}

	outputStream(callback: IFbpWorkerDataOut): void {
		this.output = callback;
	}
	connectToInSocket(connection: IFbpConnection): void {
		this.extractDataType(connection);
	}

	connectToOutSocket(connection: IFbpConnection): void {
		this.extractDataType(connection);
	}

	disconnectIn(connection: IFbpConnection): void {
		this.remoteDataType(connection);
	}

	disconnectOut(connection: IFbpConnection): void {
		this.remoteDataType(connection);
	}

	init(state: IFbpNode<ILoggerState>) {
		this.state = state;
		this.outputSocketId = state.sockets![1].id!;
	}

	extractDataType(connection: IFbpConnection) {
		const dataType = connection.dataType!;

		if (dataType !== FBP_ANY_TYPE) {
			if (this.dataTypeCount++ === 0) {
				this.updateSocketDataType(dataType);
			}
		}
	}

	remoteDataType(connection: IFbpConnection) {
		const dataType = connection.dataType!;

		if (dataType !== FBP_ANY_TYPE) {
			if (--this.dataTypeCount === 0) {
				this.updateSocketDataType(dataType);
			}
		}
	}

	updateSocketDataType(dataType: string) {
		this.state.sockets! = [
			{ ...this.state.sockets![0], dataType },
			{ ...this.state.sockets![1], dataType }];
	}
}
