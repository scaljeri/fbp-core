import { FbpWorkerPackets } from '../constants/packets';
import { IFbpConnection } from './connection';
import { IFbpSocket } from './socket';
import { IFbpState } from './state';
import { IFbpInitPacket } from './worker-packet';


export interface IFbpWorkerPacket<T = unknown> {
	type: FbpWorkerPackets;
	payload: T | IFbpInitPacket | IFbpState | IFbpConnection | IFbpSocket;
}