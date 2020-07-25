import { FbpWorkerFromNodePacketsCmds, FbpWorkerToNodePacketsCmds } from '../constants/packets';
import { IFbpConnection } from './connection';
import { IFbpNode } from './node';
import { IFbpInputStreamArgs } from './node-runner';
import { IFbpSocket } from './socket';
import { IFbpState } from './state';
import { IFbpWorkerDataOutArgs } from './worker';
import { IFbpInitPacket } from './worker-packet';

export interface FbpFnCallPacket {
	args: IFbpInputStreamArgs | IFbpWorkerDataOutArgs;
}

export interface IFbpWorkerToNodePacket {
	cmd: FbpWorkerToNodePacketsCmds;
	payload: IFbpInitPacket | IFbpNode | IFbpConnection | IFbpSocket | FbpFnCallPacket;
}

export interface IFbpWorkerFromNodePacket {
	cmd: FbpWorkerFromNodePacketsCmds;
	payload: IFbpInitPacket | IFbpState | IFbpConnection | IFbpSocket;
}