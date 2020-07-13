import { IFbpState, IFbpConnections, IFbpNodes } from '../types/state';
import { IFbpNode, IFbpNodeUI } from '../types/node';
import { createUID } from './unique-id';
import { IFbpSocket } from '../types/socket';
import { FbpSocketPositions, FbpSocketTypes } from '../constants/socket.enum';
import { IFbpConnection } from '../types/connection';
import { findNodeBySocketId, findSocket } from './state-lookups';

type INodes = Record<string, IFbpNode>;

export function cloneAndFixState(input: IFbpState = {}): IFbpState {
	return {
		...input,
		nodes: cloneAndFixNodes(input.nodes),
		connections: cloneAndFixConnections(input.connections, input.nodes)
	}
}

export function cloneAndFixNodes(input: INodes = {}): INodes {
	return Object.entries(input).reduce((nodes, [k, v]) => (nodes[k] = cloneAndFixNode(v), nodes), {} as INodes)
}

export function cloneAndFixNode(input: IFbpNode = {}): INodes {
	return {
		...input,
		...(input.config && JSON.parse(JSON.stringify(input.config))),
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

export function cloneAndFixConnections(input: IFbpConnections = {}, nodes: IFbpNodes = {}): IFbpConnections {
	return Object.entries(input).reduce((out, [k, v]) => {
		out[k] = v.map(c => cloneAndFixConnection(c, nodes));

		return out;
	}, {} as IFbpConnections);
}

export function cloneAndFixConnection(input: IFbpConnection, nodes?: IFbpNodes): IFbpConnection {
	const conn = {
		...input,
		id: input.id || createUID(),
	};

	if (!conn.from || !conn.to){
		throw new Error(`'from' and 'to' are required for a Connection`);
	}

	if (nodes) {
		let toDataType: string;

		if (!conn.fromNodeId) {
			conn.fromNodeId = findNodeBySocketId(nodes, conn.from).id;
		}
		conn.dataType = findSocket(nodes, conn.from, conn.fromNodeId).dataType;

		if (!conn.toNodeId) {
			conn.toNodeId = findNodeBySocketId(nodes, conn.to).id;
		}
		toDataType = findSocket(nodes, conn.to, conn.toNodeId).dataType;

		if (conn.dataType !== toDataType) {
			throw new Error(`Cannot connect two sockets of diffenrent data types ${conn.dataType} != ${toDataType} (id: ${conn.id})`);
		}
	}

	if (!conn.dataType) {
		throw new Error(`Connection ${conn.id} does not have a dataType`);
	}

	return conn as IFbpConnection;
}