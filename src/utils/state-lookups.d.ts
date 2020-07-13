import { IFbpNode, FbpSocketId, IFbpNodes, FbpNodeId, IFbpSocket } from '../types';
export declare function findNodeBySocketId(nodes: IFbpNodes, socketId: FbpSocketId): IFbpNode;
export declare function findSocket(nodes: IFbpNodes, socketId: FbpSocketId, nodeId?: FbpNodeId): IFbpSocket;
