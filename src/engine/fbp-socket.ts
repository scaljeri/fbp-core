import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IFbpSocket, FbpSocketId } from '../types/socket';
import { share } from 'rxjs/operators';
import { FbpSocketTypes } from '../constants';

export class FbpSocket {
	public output$!: Observable<any>;

	private output!: BehaviorSubject<any>;

	constructor(public config: IFbpSocket) {
		this.output = new BehaviorSubject(null);
		// TODO: findout if share is needed as data is produced outside the observable (hot observable)
		this.output$ = this.output.asObservable(); // pipe(share());
	}

	subscribe(cb: (data: any) => void): Subscription {
		return this.output.subscribe(cb);
	}

	public emit(value: any): void {
		this.output.next(value);
	}

	get id(): FbpSocketId {
		return this.config.id!;
	}

	get type(): FbpSocketTypes {
		return this.config.type;
	}

	get dataType(): string {
		return this.config.dataType;
	}
}