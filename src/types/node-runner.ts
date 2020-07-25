import { IFbpNode } from './node';
import { IFbpWorkerDataOut } from './worker';
import { IFbpConnection, IFbpPacketContext } from './connection';
import { FbpSocketId } from './socket';

export interface IFbpNodeWorkerStatic {
	new(): IFbpNodeRunner;
	workerPath: string;
	nodePaths: Record<string, string>;
}

export interface IFbpNodeRunnerStatic<T = any> {
	new(): IFbpNodeRunner<T>;
}

export type IFbpInputStreamArgs = [ unknown, FbpSocketId, unknown, IFbpPacketContext ];

export interface IFbpNodeRunner<T = any> {
	init(state: IFbpNode<T>): void;
	inputStream?(...[data, socketId, metadata, context]: IFbpInputStreamArgs): void;
	outputStream?(output: IFbpWorkerDataOut): void;
	connectToInSocket?(connection: IFbpConnection): void;
	connectToOutSocket?(connection: IFbpConnection): void;
	disconnectIn?(connection: IFbpConnection): void;
	disconnectOut?(connection: IFbpConnection): void;
	start?(): void;
	stop?(): void;
	resume?(): void;
}
