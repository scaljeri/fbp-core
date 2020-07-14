import { IFbpState } from '../types/state';
import { IFbpNode, FbpNodeId } from '../types/node';
import { IFbpConnection } from '../types/connection';
import { FbpSocket } from './fbp-socket';
import { FbpNodeManager } from './fbp-node-manager';
import { FbpConnection } from './fbp-connection';
import { cloneAndFixState, cloneAndFixNode, cloneAndFixConnection } from '../utils/fix-state';
import { FbpSocketId } from '../types';

export class FbpEngine {
	private _state!: IFbpState;
	private nodes!: Record<string, FbpNodeManager>;
	private sockets!: Record<string, FbpSocket>;
	private connections!: Record<string, FbpConnection>;
	private classRefs: Record<string, any> = {};

	get state(): IFbpState {
		return this._state;
	}

	set state(state: IFbpState) {
		this._state = cloneAndFixState(state);
		console.log('input', state);
		console.log('output', this._state);

		if (this.nodes) {
			Object.values(this.nodes).forEach(node => node.destroy());
		}

		this.nodes = {};
		this.sockets = {};
		this.connections = {};

		this.init();
	}

	getNode(nodeId: FbpNodeId): IFbpNode | null {
		if (this.state) {
			return this.state.nodes![nodeId];
		}

		console.warn(`Trying to retrieve node ${nodeId} without a state`);
		return null;

	}
	
	getSocket(socketId: FbpSocketId): FbpSocket | null {
		if (this.state) {
			return this.sockets[socketId];
		}

		console.warn(`Trying to retrieve socket ${socketId} without a state`);
		return null;
	}

	addNode(node: IFbpNode): IFbpNode {
		if (!this.state) {
			throw new Error('Cannot create a node without a state');
		}

		node = cloneAndFixNode(node);

		if (this.nodes[node.id!]) {
			throw new Error(`Found multiple nodes with id ${node.id}`);
		}

		this._state.nodes![node.id!] = node;
		this.nodes[node.id!] = new FbpNodeManager(node);

		node.sockets!.forEach(socket => {
			if (this.sockets[socket.id!]) {
				throw new Error(`Found multiple sockets with id ${socket.id}`);
			}

			this.sockets[socket.id!] = new FbpSocket(socket);
			this.nodes[node.id!].addSocket(this.sockets[socket.id!]);
		});

		return node;
	}

	addConnection(connection: IFbpConnection): void {
		const from = this.sockets[connection.from];
		const to = this.sockets[connection.to];

		connection = cloneAndFixConnection(connection, this.state.nodes);
		const instance = new FbpConnection(from, to, connection);

		this.connections[connection.id!] = instance;
		this.nodes[connection.fromNodeId!].connectToOutSocket(instance);
		this.nodes[connection.toNodeId!].connectToInSocket(instance);
	}

	register(name: string, classRef: any): FbpEngine {
		FbpNodeManager.register(name, classRef);
		
		return this;
	}

	private init(): void {
		Object.entries(this.state.nodes!).forEach(([key, node]) => {
			if (node.id !== key) {
				throw new Error(`Node ${node.id} has incorrect key in 'nodes' object`);
			}

			this.addNode(node);
		});

		// Object.values(this.state.connections!).forEach((connections: IFbpConnection[]) => {
		// 	// Those connection all belong to the same parent node
		// 	connections.forEach(connection => {
		// 		this.addConnection(connection);
		// 	});
		// });
	}
}