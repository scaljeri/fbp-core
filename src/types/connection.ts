import { FbpSocketId } from './socket';
import { FbpNodeId } from './node';

export type IFbpConnectionId = 'string';

export interface IFbpConnection {
	id: IFbpConnectionId;
	from: FbpSocketId;
	to: FbpSocketId;
	type: string;
}
