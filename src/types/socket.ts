import { FbpSocketTypes, FbpSocketPositions } from '../constants/socket.enum';

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

// export interface IFbpSockets {
// 	[FbpSocketTypes.IN]?: IFbpSocket[];
// 	[FbpSocketTypes.OUT]?: IFbpSocket[];
// }