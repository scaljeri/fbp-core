import { IFbpNode } from './node';
import { IFbpWorkerDataOut } from './worker';
import { IFbpConnection, IFbpPacketContext } from './connection';

export interface IFbpNodeWorker<T = any> {
	init(state: IFbpNode<T>): void;
	inputStream?(data: any, metadata: any, context: IFbpPacketContext): void;
	outputStream?(output: IFbpWorkerDataOut): void;
	connectToInSocket?(connection: IFbpConnection): void;
	connectToOutSocket?(connection: IFbpConnection): void;
	disconnectIn?(connection: IFbpConnection): void;
	disconnectOut?(connection: IFbpConnection): void;
	start?(): void;
	stop?(): void;
	resume?(): void;
}

