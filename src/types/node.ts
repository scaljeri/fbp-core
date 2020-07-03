import { IFbpSocket, IFbpSockets } from './socket';

export type FbpNodeId = string;

export interface IFbpPosition {
	top: number;
	left: number;
}

export type FbpUIMode = 'fullscreen' | 'active' | 'normal';

export interface IFbpNodeUI {
	position?: IFbpPosition;
	mode?: FbpUIMode;
	index?: number;
}

export interface IFbpNode<T = any> {
	id?: FbpNodeId;
	parentId?: FbpNodeId;
	type?: string;
	state?: T;
	sockets?: IFbpSockets;
	ui?: IFbpNodeUI;
	// mode?: 'normal' | 'demo'; // normal is default and `demo` is with transparent sockets
	// doc?: IFbpDocNode;
}

// export interface IFbpDocTitle {
//     size: 'xl' | 'l' | 's';
//     content: string;
// }

// export interface IFbpDocContent {
//     title: IFbpDocTitle;
//     content: string;
// }

// export interface IFbpDocNode {
//     position: number;
//     before: IFbpDocContent[],
//     after: IFbpDocContent[]
// }


