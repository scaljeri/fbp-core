import { Observable, Subject } from 'rxjs';

import { IFbpConnection, IFbpNode, IFbpNodeRunner, IFbpPacketContext } from '../../types';
import { IFbpWorkerDataOut } from '../../types/worker';

export class FbpWorker implements IFbpNodeRunner {
	init(state: IFbpNode<any>): void {
		throw new Error('Method not implemented.');
	}
	inputStream?(data: any, socketId: string, metadata: any, context: IFbpPacketContext): void {
		throw new Error('Method not implemented.');
	}
	outputStream?(output: IFbpWorkerDataOut): void {
		throw new Error('Method not implemented.');
	}
	connectToInSocket?(connection: IFbpConnection): void {
		throw new Error('Method not implemented.');
	}
	connectToOutSocket?(connection: IFbpConnection): void {
		throw new Error('Method not implemented.');
	}
	disconnectIn?(connection: IFbpConnection): void {
		throw new Error('Method not implemented.');
	}
	disconnectOut?(connection: IFbpConnection): void {
		throw new Error('Method not implemented.');
	}
	start?(): void {
		throw new Error('Method not implemented.');
	}
	stop?(): void {
		throw new Error('Method not implemented.');
	}
	resume?(): void {
		throw new Error('Method not implemented.');
	}
// 	public static workerPath = '/';

// 	public static create(name: string, path = FbpWorker.workerPath): IFbpNodeWorker {

// 		const filePath = `${path}/${name}.js`.replace(/\/\//, '/');

// 		const instance = new FbpWorker(new Worker(filePath));
// 		// instance.worker = new Worker(filePath);

// 		return instance;
// 	}

// 	private constructor(private worker: Worker) {}

// 	connect(inStream: Observable<any>, outStream: Subject<any>) {

// 	}

// 	destroy(): void {

// 	}

// 	// private constructor() {
// 		// TODO: how to resolve the path here!
// 		// this.worker.postMessage({ type: 'init', payload: 'logger' });
// 		// var worker = new Worker('/random-number-generator.js')

// 		// setTimeout(() => {
// 			// worker.postMessage({ type: 'packet', payload: 'magic' });
// 		// }, 500);
// 	// }

// 	update(data: any): void {
// 		throw new Error('Method not implemented.');
// 	}

// 	setConfig(config: IFbpNode): void {
// 		this.postMessage('config', config);
// 	}

// 	// setData()

// 	private postMessage(type: string, payload: any) {
// 		this.worker.postMessage({ type, payload });
// 	}
}
