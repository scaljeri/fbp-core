import { IFbpSocket } from './socket';

export type FbpNodeId = string;

export interface IFbpPosition {
	top: number;
	left: number;
}

export type FbpUIMode = 'fullscreen' | 'active' | 'normal';

export interface IFbpNodeUI {
	tagName?: string,
	position?: IFbpPosition;
	mode?: FbpUIMode;
	index?: number;
}

export interface IFbpNode<T = any> {
	id?: FbpNodeId;
	title?: string;
	parentId?: FbpNodeId;
	type?: string;
	config?: T;
	sockets?: IFbpSocket[];
	ui?: IFbpNodeUI;
	async?: boolean;
	autoStart?: boolean;

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


