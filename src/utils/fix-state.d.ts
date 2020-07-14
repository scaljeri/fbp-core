import { IFbpState, IFbpConnections, IFbpNodes } from '../types/state';
import { IFbpNode, IFbpNodeUI } from '../types/node';
import { IFbpSocket } from '../types/socket';
import { IFbpConnection } from '../types/connection';
declare type INodes = Record<string, IFbpNode>;
export declare function cloneAndFixState(input?: IFbpState): IFbpState;
export declare function cloneAndFixNodes(input?: INodes): INodes;
export declare function cloneAndFixNode(input?: IFbpNode): INodes;
export declare function cloneAndFixUi(input?: IFbpNodeUI): IFbpNodeUI;
export declare function cloneAndFixSockets(input?: IFbpSocket[]): IFbpSocket[];
export declare function cloneAndFixSocket(input: IFbpSocket): IFbpSocket;
export declare function cloneAndFixConnections(input?: IFbpConnections, nodes?: IFbpNodes): IFbpConnections;
export declare function cloneAndFixConnection(input: IFbpConnection, nodes?: IFbpNodes): IFbpConnection;
export {};