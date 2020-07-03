import { IFbpNode } from './node';
import { IFbpConnection } from './connection';

export interface IFbpNodes {
	[id: string]: IFbpNode;
}

export interface IFbpConnections {
	[id: string]: IFbpConnection;
}

export interface IFbpState {
	name: string;
	nodes: IFbpNodes;
	connections: IFbpConnections;
}
