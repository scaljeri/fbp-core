export enum FbpWorkerToNodePacketsCmds {
	init = 'init',								// Initialize with config from state
	inputStream = 'inputStream',
	outputStream = 'outputStream',
	connectToInSocket = 'connectToInSocket',
	connectToOutSocket = 'connectToOutSocket',
	disconnectIn = 'disconnectIn',
	disconnectOut = 'disconnectOut',
	start = 'start',
	stop = 'stop',
	resume = 'resume'
}

export enum FbpWorkerFromNodePacketsCmds {
	ready = 'ready',
	data = 'data',
	stateUpdate = 'stateUpdate',
}