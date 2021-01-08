import { FbpSocketId } from './socket';
import { FbpNodeId } from './node';

export type FbpConnectionId = string;

export interface IFbpConnection {
	from: FbpSocketId;
	to: FbpSocketId;
	dataType?: string;
	id?: FbpConnectionId;
	fromNodeId?: FbpNodeId;
	toNodeId?: FbpNodeId;
}

export interface IFbpPacketContext {
	fromSocketId?: FbpSocketId, 
	connectionId?: FbpConnectionId
	sourceNodeType?: string;
}

export interface IFbpPackageEmit extends IFbpPacketContext {
	value: any
	metadata?: any;
}