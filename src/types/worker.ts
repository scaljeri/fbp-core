import { IFbpNode } from './node';
import { FbpSocketId } from './socket';

export interface IFbpNodeWrapper {
	setConfig(config: IFbpNode): void;
}

export type IFbpWorkerDataOutArgs = [unknown, FbpSocketId, unknown? ];
export type IFbpWorkerDataOut = (...[data, socketId, metaData]: IFbpWorkerDataOutArgs) => void;

export type IFbpWorkerStateUpdate<T> = (state: IFbpNode<T>) => void;