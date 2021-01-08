import { IFbpState, IFbpConnections, IFbpNodes } from '../types/state';
import { IFbpNode, IFbpNodeUI } from '../types/node';
import { createUID } from './unique-id';
import { IFbpSocket } from '../types/socket';
import { FbpSocketPositions, FbpSocketTypes } from '../constants/socket.enum';
import { IFbpConnection } from '../types/connection';
import { findNodeById, findNodeBySocketId, findSocket } from './state-lookups';

export function cloneAndFixState(input: IFbpState = {}): IFbpState {
	return {
		...input,
		nodes: cloneAndFixNodes(input.nodes),
		connections: cloneAndFixConnections(input.connections, input.nodes)
	}
}

export function cloneAndFixNodes(input: IFbpNode[] = []): IFbpNode[] {
	return input.map(cloneAndFixNode);
}

export function cloneAndFixNode(input: IFbpNode = {}): IFbpNode {
	return {
		...input,
		...(input.config && { config: JSON.parse(JSON.stringify(input.config)) }),
		id: input.id || createUID(),
		sockets: cloneAndFixSockets(input.sockets),
		ui: cloneAndFixUi(input.ui)
	};
}

export function cloneAndFixUi(input: IFbpNodeUI = {}): IFbpNodeUI {
	return {
		...input,
		position: { ...(input.position || { left: 0, top: 0 }) }
	};
}

export function cloneAndFixSockets(input: IFbpSocket[] = []): IFbpSocket[] {
	return input.map(cloneAndFixSocket);
}

export function cloneAndFixSocket(input: IFbpSocket): IFbpSocket {
	const socket = {
		...input,
		id: input.id || createUID()
	};

	if (socket.side) {
		if (socket.type === FbpSocketTypes.INTERN) {
			throw new Error(`Socket ${socket.id} is of type INTERN, it can't have a "side" value`);
		}
	} else if (socket.type !== FbpSocketTypes.INTERN) {
		socket.side = socket.type === FbpSocketTypes.IN ? FbpSocketPositions.LEFT : FbpSocketPositions.RIGHT;
	} 

	return socket;
}

export function cloneAndFixConnections(input: IFbpConnection[] = [], nodes: IFbpNode[] = []): IFbpConnection[] {
	return (input
		.map(conn => cloneAndFixConnection(conn, nodes))
		.filter(Boolean)) as IFbpConnection[];
}

// 1) Clone a connection
// 2) Verify dataType based on the socketIn type
// 3) Add missing from/to and fromNodeId/toNodeId if possible
// 4) If it cannot be fixed, it returns `null`
export function cloneAndFixConnection(input: IFbpConnection, nodes?: IFbpNode[]): IFbpConnection | null {
	const conn = {
		...input,
		id: input.id || createUID(),
	};

	if (nodes === undefined) {
		return conn;
	}

	if (!conn.from || !conn.to){
		throw new Error(`'from' and 'to' are required for a Connection (id=${conn.id})`);
	}
	if (nodes.length > 0) {
		let toDataType: string;

		if (!conn.fromNodeId) {
			conn.fromNodeId = findNodeBySocketId(nodes, conn.from)!.id;
		}

		// Always determine dataType, just to make sure
		const fromSocket = findSocket(nodes, conn.from, conn.fromNodeId);
		if (!fromSocket) {
			// TODO: Hmmm no from socket found, maybe we should not keep this connection
			return null;
		}
		conn.dataType = fromSocket!.dataType;

		const toNode = conn.toNodeId ? findNodeById(nodes, conn.toNodeId) : findNodeBySocketId(nodes, conn.to);
		if (!toNode) {
			// TODO: Hmmm no to-node found, maybe we should not keep this connection
			return null;
		}
		conn.toNodeId = toNode!.id;

		// Final check
		toDataType = findSocket(nodes, conn.to, conn.toNodeId)!.dataType!;
		if (conn.dataType !== toDataType) {
			// TODO: No idea what to do with this
			throw new Error(`Cannot connect two sockets of diffenrent data types ${conn.dataType} != ${toDataType} (id: ${conn.id})`);
		}
	} else {
		// TODO: remove connection????
		return null;
	}

	return conn as IFbpConnection;
}