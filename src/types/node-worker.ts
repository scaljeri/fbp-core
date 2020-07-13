import { IFbpConnection, IFbpConnectionId } from './connection';
import { IFbpNode } from './node';
import { IFbpWorkerDataOut, IFbpWorkerStateUpdate } from './worker';
import { FbpSocketId } from './socket';

export interface IFbpNodeWorker<T = any> {
	init(state: IFbpNode<T>): void;
	inputStream?(data: any, socketId: FbpSocketId, connectionId:  IFbpConnectionId): void;
	outputStream?(output: IFbpWorkerDataOut): void;
	connectToInSocket?(connection: IFbpConnection): void;
	connectToOutSocket?(connection: IFbpConnection): void;
	disconnectIn?(connection: IFbpConnection): void;
	disconnectOut?(connection: IFbpConnection): void;
	start?(): void;
	stop?(): void;
	resume?(): void;
}

