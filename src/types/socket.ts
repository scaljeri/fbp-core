import { FbpSocketTypes, FbpSocketPositions } from '../constants/socket.enum';
import { IFbpPacketContext } from './connection';

export type FbpSocketId = string; 

// export interface IFbpSocketsSide {
// 	add?: boolean;
// 	remove?: boolean;
// 	items: IFbpSocket[];
// }

export interface IFbpSocket {
	id?: FbpSocketId;
	type: FbpSocketTypes;
	color?: string;
	label?: string;
	dataType?: any;
	side?: FbpSocketPositions;
}

export interface IFbpSocketPacket {
	value: any;
	metadata: any;
	context: IFbpPacketContext
}
// export interface IFbpSockets {
// 	[FbpSocketTypes.IN]?: IFbpSocket[];
// 	[FbpSocketTypes.OUT]?: IFbpSocket[];
// }