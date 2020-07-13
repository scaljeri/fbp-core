import { IFbpNode } from './node';
import { FbpSocketId } from './socket';
export interface IFbpNodeWrapper {
    setConfig(config: IFbpNode): void;
}
export declare type IFbpWorkerDataOut = (data: any, socketId: FbpSocketId) => void;
export declare type IFbpWorkerStateUpdate<T> = (state: IFbpNode<T>) => void;
