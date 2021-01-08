import { IFbpNode } from './node';
import { IFbpConnection } from './connection';

export interface IFbpNodes {
	[id: string]: IFbpNode;
}

// key is parentNodeId
export interface IFbpConnections {
	[id: string]: IFbpConnection[];
}

export interface IFbpState {
	name?: string;
	nodes?: IFbpNode[];
	connections?: IFbpConnection[];
}
