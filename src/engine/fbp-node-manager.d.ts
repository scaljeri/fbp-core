import { IFbpNode, FbpNodeId } from '../types/node';
import { FbpSocket } from './fbp-socket';
import { FbpSocketId } from '../types';
export declare class FbpNodeManager {
    config: IFbpNode;
    sockets: Record<string, FbpSocket>;
    private node;
    private inputs;
    private outputs;
    constructor(config: IFbpNode, NodeClasses?: Record<string, any>);
    addSocket(socket: FbpSocket): void;
    removeSocket(id: FbpSocketId): void;
    destroy(): void;
    get id(): FbpNodeId;
}
