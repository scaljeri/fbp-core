import { FbpSocketId } from './socket';
import { FbpNodeId } from './node';

export type IFbpConnectionId = 'string';

export interface IFbpConnection {
	id: IFbpConnectionId;
	node: FbpNodeId;
	from: FbpSocketId;
	to: FbpSocketId;
	type: string;
}
