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
