import { FbpWorkerFromNodePacketsCmds, FbpWorkerToNodePacketsCmds } from '../constants';
import { FbpFnCallPacket, FbpSocketId, IFbpConnection, IFbpNode, IFbpPacketContext, IFbpWorkerFromNodePacket, IFbpWorkerToNodePacket} from '../types';
import { IFbpInputStreamArgs, IFbpNodeRunner } from '../types/node-runner';
import { IFbpWorkerDataOut, IFbpWorkerDataOutArgs } from '../types/worker';

export abstract class AsyncNodeRunner implements IFbpNodeRunner {
	abstract init(state: IFbpNode<any>): void;
	abstract send(data: IFbpWorkerToNodePacket): void;
	abstract nodeState: IFbpNode;
	output!: IFbpWorkerDataOut;

	// Received data from worker
	packet(packet: IFbpWorkerFromNodePacket): void {
		switch (packet.cmd) {
			case FbpWorkerFromNodePacketsCmds.ready:
				console.log(`Worker ${this.nodeState.type}/${this.nodeState.id} is ready`);
				break;
			case FbpWorkerFromNodePacketsCmds.data:
				console.log('Received data', packet);

				const args = (packet.payload as FbpFnCallPacket).args as IFbpWorkerDataOutArgs;
				this.output(...args);
				break;
			case FbpWorkerFromNodePacketsCmds.stateUpdate:
				console.log('State update');
				break;
			default:
				console.log('unknown cmd', packet);
				// throw new Error(`Node of type ${this.nodeState.type} produced output of unknown type: ${d.type}`);
		}
	}

	error(err: unknown): void {
		console.log('Received worker error: ', err);
	}

	exit(code: unknown): void {
		console.log(`Received exit from worker ${this.nodeState.type}: ${this.nodeState.id}`);
	}

	inputStream(...args: IFbpInputStreamArgs): void {
		console.log('write data to worker', args);
		this.send({ 
			cmd: FbpWorkerToNodePacketsCmds.inputStream,
			payload: { args }
		});
	}

	outputStream?(output: IFbpWorkerDataOut): void { 
		this.output = output;
	}

	connectToInSocket?(connection: IFbpConnection): void {

	}
	connectToOutSocket?(connection: IFbpConnection): void {

	}
	disconnectIn?(connection: IFbpConnection): void {

	}
	disconnectOut?(connection: IFbpConnection): void {

	}

	start?(): void {

	}
	stop?(): void {

	}
	resume?(): void {
	}
}