import { IFbpNode, IFbpNodeWorker } from '../../types';

// export class DirectWrapper {
// 	private instance: any;

// 	public static create(name: string, path = FbpWorker.workerPath): IFbpNodeWorker {
// 	}
// 	async initialize(path: string): Promise<void> {
// 		const mod = await import(path);
// 		this.instance = new mod.DirectWrapper();
// 	}

// 	setNodeConfig(config: IFbpNode): void {

// 	}
// }


// export class FbpWorker implements IFbpNodeWorker {
// 	public static workerPath = '/';

// 	public static create(name: string, path = FbpWorker.workerPath): IFbpNodeWorker {

// 		const filePath = `${path}/${name}.js`.replace(/\/\//, '/');

// 		const instance = new FbpWorker(new Worker(filePath));
// 		// instance.worker = new Worker(filePath);

// 		return instance;
// 	}

// 	private constructor(private worker: Worker) { }

// 	connect(inStream: Observable<any>, outStream: Subject<any>) {

// 	}

// 	destroy(): void {

// 	}

// 	// private constructor() {
// 	// TODO: how to resolve the path here!
// 	// this.worker.postMessage({ type: 'init', payload: 'logger' });
// 	// var worker = new Worker('/random-number-generator.js')

// 	// setTimeout(() => {
// 	// worker.postMessage({ type: 'packet', payload: 'magic' });
// 	// }, 500);
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
// }
