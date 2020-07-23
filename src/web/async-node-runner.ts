import { IFbpNode, IFbpNodeWorker } from '../types';

export class AsyncNodeRunner implements IFbpNodeWorker {
	init(state: IFbpNode<any>): void {
		throw new Error('Method not implemented.');
	}

}