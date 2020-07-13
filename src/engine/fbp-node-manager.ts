import { IFbpNode, FbpNodeId } from '../types/node';
import { FbpSocket } from './fbp-socket';
import { FbpSocketId, IFbpNodeWorker } from '../types';

export class FbpNodeManager {
	public sockets!: Record<string, FbpSocket>;
	private node!: IFbpNodeWorker;
	private inputs: Record<string, any>;
	private outputs: Record<string, any>;

	constructor(public config: IFbpNode, NodeClasses: Record<string, any> = {}) {
	 	if (config.async) {
	 		// TODO: problems
	 	} else {
			// this.node = new NodeClasses[config.id!]();
			// this.node.init(config);
	 	}

	}

	addSocket(socket: FbpSocket): void {
		// this.sockets[socket.id] = socket;
	}

	removeSocket(id: FbpSocketId): void {
		this.sockets
	}

	destroy(): void {

	}

	get id(): FbpNodeId {
		return this.config.id!;
	}
}