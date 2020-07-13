import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { FbpSocket } from './fbp-socket';
import { IFbpConnection, IFbpConnectionId } from '../types/connection';
import { FbpSocketTypes } from '../constants';

export class FbpConnection {
	private subscription: Subscription | null = null;

	constructor(private from: FbpSocket, private to: FbpSocket, private config: IFbpConnection) {
		this.subscription = from.subscribe(value => to.emit(value));
	}

	destroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
			this.subscription = null;
		}
	}

	get id(): IFbpConnectionId {
		return this.config.id!;
	}

	get dataType(): string {
		return this.config.dataType;
	}

	get inSocket(): FbpSocket {
		return this.from;
	}

	get outSocket(): FbpSocket {
		return this.to;
	}
}
