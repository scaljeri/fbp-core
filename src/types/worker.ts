import { IFbpNode } from './node';
import { IFbpConnection, IFbpConnectionId } from './connection';
import { FbpSocketId } from './socket';

export interface IFbpNodeWrapper {
	setConfig(config: IFbpNode): void;
}

export type IFbpWorkerDataOut = (data: any, socketId: FbpSocketId, metaData?: any) => void;
export type IFbpWorkerStateUpdate<T> = (state: IFbpNode<T>) => void;