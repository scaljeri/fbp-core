import { IFbpNode } from './node';
import { IFbpWorkerDataOut } from './worker';
import { IFbpConnection, IFbpPacketContext } from './connection';
import { FbpSocketId } from './socket';

export interface IFbpNodeWorkerStatic {
	new?(): IFbpNodeWorker;
}

export interface IFbpNodeWorker<T = any> {
	init(state: IFbpNode<T>): void;
	inputStream?(data: any, socketId: FbpSocketId, metadata: any, context: IFbpPacketContext): void;
	outputStream?(output: IFbpWorkerDataOut): void;
	connectToInSocket?(connection: IFbpConnection): void;
	connectToOutSocket?(connection: IFbpConnection): void;
	disconnectIn?(connection: IFbpConnection): void;
	disconnectOut?(connection: IFbpConnection): void;
	start?(): void;
	stop?(): void;
	resume?(): void;
}

