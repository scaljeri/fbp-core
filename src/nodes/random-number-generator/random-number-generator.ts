import { FbpSocketTypes } from '../../constants';
import { IFbpNode, FbpSocketId, IFbpNodeRunnerStatic, IFbpNodeRunner } from '../../types';
import { IFbpWorkerDataOut } from '../../types/worker';

interface IFbpRandomNumberGeneratorState {
	interval: number;
	min: number;
	max: number;
	intergerOnly: boolean;
}

export default class NodeRunner implements IFbpNodeRunner<IFbpRandomNumberGeneratorState> {
	static type = 'random-number-generator';
	private intervalId!: any; // NodeJs and the browser have different types
	private output!: IFbpWorkerDataOut;
	private state!: IFbpNode;
	private countConnections = 0;
	private outputSocketId!: FbpSocketId;

	constructor() {
		console.log('RND');
	}

	stop(): void {
		clearInterval(this.intervalId);
		this.intervalId = null;
	}

	pause(): void {
		this.stop();
	}

	resume(): void {
		this.stop();

		this.intervalId = setInterval(() => {
			if (this.output) {
				const value = Math.random() * (this.state.config.max - this.state.config.min) + this.state.config.min;
				console.log('RND: ' + value);
				this.output(value, this.outputSocketId);
			}
		}, this.state.config.interval);
	}

	outputStream(output: IFbpWorkerDataOut): void {
		this.output = output;
	}

	connectToOutSocket(): void {
		this.countConnections ++;

		if (this.countConnections === 1) {
			this.resume();
		}
	}

	disconnectOut(): void {
		this.countConnections -= this.countConnections === 0 ? 0 : 1;

		if (this.countConnections === 0) {
			clearInterval(this.intervalId);
		}
	}

	init(state: IFbpNode<IFbpRandomNumberGeneratorState>) {
		const oldState = this.state;
		this.state = state;

		if (!state.config) {
			this.state.config = {
				interval: 1000,
				min: 0, max: 1
			}
		}

		if (!oldState) {
			if (state.autoStart !== false) {
				this.resume();
			}
	 	} else if (oldState.config.interval !== (state.config || {}).interval && this.intervalId) {
			this.resume();
		}

		this.outputSocketId = state.sockets![0].id!;
	}
}

export { NodeRunner, NodeRunner as FbpRandonNumberGenerator };
