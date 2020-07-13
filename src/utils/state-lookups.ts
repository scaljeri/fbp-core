import { FbpSocket } from '../engine/fbp-socket';
import { IFbpNode, FbpSocketId, IFbpNodes, FbpNodeId, IFbpSocket } from '../types';

export function findNodeBySocketId(nodes: IFbpNodes, socketId: FbpSocketId): IFbpNode {
	return Object.entries(nodes).find(([k, v]) => {
		return (v.sockets || []).find(s => s.id === socketId);
	})![1];
}

export function findSocket(nodes: IFbpNodes, socketId: FbpSocketId, nodeId?: FbpNodeId): IFbpSocket {
	const node = nodeId ? nodes[nodeId] : findNodeBySocketId(nodes, socketId);

	return node.sockets!.find((socket: IFbpSocket) => socket.id === socketId)!;
}