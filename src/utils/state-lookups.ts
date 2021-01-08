import { IFbpNode, FbpSocketId, FbpNodeId, IFbpSocket } from '../types';

export function findSocketInNodes(nodes: IFbpNode[], socketId: FbpSocketId): IFbpSocket | null {
	for(let i = 0; i < nodes.length; i++) {
		const socket = findSocketInNode(nodes[i], socketId);
		
		if (socket) {
			return socket;
		}
	}

	return null;
}

export function findSocketInNode(node: IFbpNode, socketId: FbpSocketId): IFbpSocket | null {
	return (node.sockets || []).find(socket => socket.id === socketId) || null;
}

export function findNodeById(nodes: IFbpNode[], nodeId: FbpNodeId): IFbpNode {
	return nodes.filter(node => node.id === nodeId)[0];
}

export function findSocket(nodes: IFbpNode[], socketId: FbpSocketId, nodeId?: FbpNodeId): IFbpSocket | null {
	return nodeId ? findSocketInNode(findNodeById(nodes, nodeId), socketId) : 
		findSocketInNodes(nodes, socketId);
}

export function findNodeBySocketId(nodes: IFbpNode[], socketId: FbpSocketId): IFbpNode | null {
	for (let i = 0; i < nodes.length; i++) {
		const socket = findSocketInNode(nodes[i], socketId);

		if (socket) {
			return  nodes[i];
		}
	}

	return null;

}