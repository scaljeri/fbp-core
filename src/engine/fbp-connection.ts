import { Subscription } from 'rxjs';
import { FbpSocket } from './fbp-socket';
import { IFbpConnection, FbpConnectionId } from '../types/connection';
import { FbpNodeId } from '../types';

export class FbpConnection {
	private subscription: Subscription | null = null;

	constructor(private from: FbpSocket, private to: FbpSocket, public config: IFbpConnection) {
		if (from.id === to.id) {
			throw new Error(`Input and output socket are the same for connection ${config.id}`);
		}

		this.subscription = from.subscribe(value => {
			to.emit({ value, connectionId: config.id, fromSocketId: from.id })
		});
	}

	destroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
		} else {
			console.warn(`Connection ${this.id} was already destroyed`);
		}
	}

	get id(): FbpConnectionId {
		return this.config.id!;
	}

	get dataType(): string {
		return this.config.dataType!;
	}

	get inSocket(): FbpSocket {
		return this.from;
	}

	get outSocket(): FbpSocket {
		return this.to;
	}

	get fromNodeId(): FbpNodeId {
		return this.config.fromNodeId!;
	}

	get toNodeId(): FbpNodeId {
		return this.config.toNodeId!;
	}
}
