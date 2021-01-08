import { Observable, Subject, Subscription } from 'rxjs';
import { IFbpSocket, FbpSocketId } from '../types/socket';
import { FbpSocketTypes } from '../constants';
import { IFbpPackageEmit, IFbpPacketContext } from '../types/connection';

export class FbpSocket {
	public output$!: Observable<IFbpPackageEmit>;

	private output!: Subject<IFbpPackageEmit>;

	constructor(public config: IFbpSocket) {
		this.output = new Subject<IFbpPackageEmit>();
		// TODO: findout if share is needed as data is produced outside the observable (hot observable)
		this.output$ = this.output.asObservable(); // pipe(share());
	}

	subscribe(cb: (data: any, context: IFbpPacketContext) => void): Subscription {
		return this.output.subscribe(data => {
			const value = data!.value;
			delete data!.value;

			cb(value, data as IFbpPacketContext)
		});
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

	get dataType(): string | undefined {
		return this.config.dataType;
	}
}