import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * This class manages streams
 */
interface StreamManagement {
	count: number;
	subject: Subject<any>;
	observable: Observable<any>;
}

export class FbpStreams {
	private streamz: Record<string, StreamManagement> = {}

	constructor() { }

	consume(id: string, refCount = true) {
		if (!this.streamz[id]) {
			this.streamz[id] = this.createStream();
		}

		if (refCount) {
			this.streamz[id].count++;
		}

		return this.streamz[id].observable;
	}

	produce(id: string, refCount = true) {
		if (!this.streamz[id]) {
			this.streamz[id] = this.createStream();
		}

		if (refCount) {
			this.streamz[id].count++;
		}

		return this.streamz[id].subject;
	}

	unsubscribe(...ids: string[]) {
		ids.forEach(id => {

			this.streamz[id].count--;

			// cleanup
			if (this.streamz[id].count === 0) {
				delete this.streamz[id];
			}
		});
	}

	private createStream(): StreamManagement {
		const bs = new Subject();

		return {
			count: 0,
			subject: bs,
			observable: bs.pipe(share())
		}
	}
}
