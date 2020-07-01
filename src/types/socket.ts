import { FbpSocketTypes } from '../constants/socket-type.enum';
import { FbpNodeId } from './node';

export type FbpSocketId = ''
export interface IFbpSocket {
	id: FbpSocketId;
	node: FbpNodeId;
	color?: string;
	label?: string;
	type: FbpSocketTypes;
}
