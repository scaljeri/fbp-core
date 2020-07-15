// import { IFbpNode, IFbpSockets, IFbpSocket } from '../types';
// import { FbpSocketTypes } from '../constants/socket.enum';

// export function instrument(node: IFbpNode, hooks: any): IFbpNode {
// 	let sockets = node.sockets || {};
// 	let socketsIn = sockets[FbpSocketTypes.IN] || [];
// 	let socketsOut = sockets[FbpSocketTypes.OUT] || [];
// 	let config = node.config;

// 	Object.defineProperties(sockets, {
// 		[FbpSocketTypes.IN]: {
// 			get: (): IFbpSocket[] => {
// 				return socketsIn;
// 			},
// 			set: (s: IFbpSocket[]) => {
// 				if (socketsIn !== s) {
// 					sockets[FbpSocketTypes.IN] = hooks.socketUpdate(s);
// 				}
// 			}
// 		},
// 		[FbpSocketTypes.OUT]: {
// 			get: (): IFbpSocket[] => {
// 				return socketsOut;
// 			},
// 			set: (s: IFbpSocket[]) => {
// 				if (socketsOut !== s) {
// 					sockets[FbpSocketTypes.OUT] = hooks.socketUpdate(s);
// 				}
// 			}
// 		}
// 	});

// 	Object.defineProperties(node, {
// 		config: {
// 			get: (): any => {
// 				return config;
// 			},
// 			set: (c: any) => {
// 				config = hooks.updateConfig(c, config);
// 			}
// 		},
// 		sockets: {
// 			get: (): IFbpSockets => {
// 				return sockets;
// 			},
// 			set: (c: IFbpSockets) => {
// 				sockets[FbpSocketTypes.IN] = c[FbpSocketTypes.IN];
// 				sockets[FbpSocketTypes.OUT] = c[FbpSocketTypes.OUT];
// 			}
// 		}
// 	});

// 	return node;
// }

// export class FbpNodesMngr {
// 	private worker: any;

// 	constructor() { }

// 	setWorker(worker: any): void {
// 		this.worker = worker;
// 	}

// 	setNodes(nodes: IFbpNode[]): void {

// 	}

// 	setConnections(connections: IFbpConnection[]): void {

// 	}

// 	removeConnection(connection: IFbpConnection): void {

// 	}

// 	removeNode(node: IFbpNode): void {

// 	}

// 	updateNode(node: IFbpNode): void {

// 	}


// 	private setup(nodes: IFbpNode[]): void {

// 	}
// }
