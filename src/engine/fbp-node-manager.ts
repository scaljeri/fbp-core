import { IFbpNode, FbpNodeId } from '../types/node';
import { FbpSocket } from './fbp-socket';
import { FbpSocketId, IFbpNodeWorker, IFbpPacketContext } from '../types';
import { FbpConnection } from './fbp-connection';
import { FbpSocketTypes } from '../constants';
import { Subscription } from 'rxjs';
import { IFbpWorkerDataOut } from '../types/worker';
export class FbpNodeManager {
	public sockets!: Record<string, FbpSocket>;
	private node!: IFbpNodeWorker;
	// private inputs: Record<string, any>;
	// private outputs: Record<string, any>;
	private inputs: Record<string, Subscription> = {};

	static NodeClasses: Record<string, any> = {};

	static register(name: string, classRef: any): void {
		FbpNodeManager.NodeClasses[name] = classRef;
	}

	constructor(public config: IFbpNode) {
		if (config.async) {
			this.node = {
				init: () => {
					// remote stuff
				},
				outputStream: (cb: IFbpWorkerDataOut) => {
					// remote stuff
				},
				inputStream: (data: any, context: IFbpPacketContext) => {

				}
			} as IFbpNodeWorker;
		} else if (config.type && FbpNodeManager.NodeClasses[config.type]) {
			this.node = new (FbpNodeManager.NodeClasses[config.type!])();
		} 
		console.log('test', this.node);

		this.node.init(config);
	}

	addSocket(socket: FbpSocket): void {
		if (socket.type === FbpSocketTypes.IN) {
			this.inputs[socket.id] = socket.output$.subscribe(({ value, metadata, ...context}) => {
				this.node.inputStream!(value, metadata, context as IFbpPacketContext);
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

					this.sockets[socketId].emit({ value, metadata });
				});
			}
		}

		this.sockets[socket.id] = socket;
	}

	connectToOutSocket(connection: FbpConnection): void {
		console.log('connect to out socket');
	}

	connectToInSocket(connection: FbpConnection): void {
		console.log('connect to in socket');

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