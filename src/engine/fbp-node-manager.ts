import { IFbpNode, FbpNodeId } from '../types/node';
import { FbpSocket } from './fbp-socket';
import { FbpSocketId, IFbpNodeRunner, IFbpNodeWorkerStatic, IFbpPacketContext } from '../types';
import { FbpConnection } from './fbp-connection';
import { FbpSocketTypes } from '../constants';
import { Subscription } from 'rxjs';
import { IFbpWorkerDataOut } from '../types/worker';
export class FbpNodeManager {
	static asyncNode: IFbpNodeWorkerStatic;

	public sockets: Record<string, FbpSocket> = {};
	private node!: IFbpNodeRunner;
	// private inputs: Record<string, any>;
	// private outputs: Record<string, any>;
	private inputs: Record<string, Subscription> = {};

	static NodeClasses: Record<string, any> = {};

	static register(classRef: any, type: string = classRef.type): void {
		if (!type) {
			throw new Error(`Trying to register a class without a type (${classRef.constructor.name})`);
		}

		FbpNodeManager.NodeClasses[type] = classRef;
	}

	constructor(public config: IFbpNode) {
		if (config.async) {
			if (!FbpNodeManager.asyncNode) {
				// TODO: Change into warning and continue
				throw new Error('FbpNodeManager can not run nodes async if no AsyncNode is defined');
			}

			this.node = new FbpNodeManager.asyncNode();
		} else if (FbpNodeManager.NodeClasses[config.type!]) {
			this.node = new (FbpNodeManager.NodeClasses[config.type!])();
		} else {
			throw new Error(`Cannot instantiate node of type ${config.type}`)
		}

		this.node.init(config);
	}

	addSocket(socket: FbpSocket): void {
		const self = this;
		if (socket.type === FbpSocketTypes.IN) {
			this.inputs[socket.id] = socket.output$.subscribe(({ value, metadata, ...context}) => {
				this.node.inputStream!(value, socket.id, metadata, context as IFbpPacketContext);
			});
		} else if (socket.type === FbpSocketTypes.OUT) {
			if (this.node.outputStream) {
				this.node.outputStream((value: any, socketId: FbpSocketId, metadata: any) => {
					if (!this.sockets[socketId]) {
						throw new Error(`Node ${this.config.id} emits to a socket which does not exist (socketid=${socketId})`);
					}

					if (socket.type === FbpSocketTypes.IN) {
						throw new Error(`Node ${this.config.id} emits data to an input socket ${this.config.id}`);
					}

					console.log('put data into socket', socketId, value);
					this.sockets[socketId].emit({ value, metadata });
				});
			}
		}

		this.sockets[socket.id] = socket;
	}

	connectToOutSocket(connection: FbpConnection): void {
		if (this.node.connectToOutSocket) {
			this.node.connectToOutSocket(connection.config);
		}
	}

	connectToInSocket(connection: FbpConnection): void {
		if (this.node.connectToInSocket) {
			this.node.connectToInSocket(connection.config);
		}
	}

	removeSocket(id: FbpSocketId): void {
		// this.sockets
	}

	destroy({ code }: any): void {
		// TODO
		// new state: code === 1
	}

	get id(): FbpNodeId {
		return this.config.id!;
	}
}