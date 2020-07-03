import { FbpSocketTypes, FbpSocketPositions } from '../constants/socket.enum';

export type FbpSocketId = string; 

export interface IFbpSocketsSide {
	add?: boolean;
	remove?: boolean;
	items: IFbpSocket[];
}

export interface IFbpSocket {
	id: FbpSocketId;
	type: FbpSocketTypes;
	color?: string;
	label?: string;
	dataTypes: any[];
}

export type IFbpSockets = { 
	[FbpSocketPositions.TOP]?: IFbpSocketsSide;
	[FbpSocketPositions.RIGHT]?: IFbpSocketsSide;
	[FbpSocketPositions.BOTTOM]?: IFbpSocketsSide;
	[FbpSocketPositions.LEFT]?: IFbpSocketsSide;
}