import { IFbpState } from '../types/state';
import { IFbpNode, FbpNodeId } from '../types/node';
import { IFbpConnection } from '../types/connection';
export declare class FbpEngine {
    private _state;
    private nodes;
    private sockets;
    private connections;
    get state(): IFbpState;
    set state(state: IFbpState);
    getNode(nodeId: FbpNodeId): IFbpNode | null;
    addNode(node: IFbpNode): IFbpNode;
    addConnection(connection: IFbpConnection): void;
    private init;
}
