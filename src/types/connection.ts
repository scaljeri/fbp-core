import { FbpSocketId } from './socket';
import { FbpNodeId } from './node';

export type IFbpConnectionId = string;

export interface IFbpConnection {
	from: FbpSocketId;
	to: FbpSocketId;
	dataType?: string;
	id?: IFbpConnectionId;
	fromNodeId?: FbpNodeId;
	toNodeId?: FbpNodeId;
}

export interface IFbpPacketContext {
	fromSocketId?: FbpSocketId, 
	connectionId?: IFbpConnectionId
	sourceNodeType?: string;
}

export interface IFbpPackageEmit extends IFbpPacketContext {
	value: any
	metadata?: any;
}