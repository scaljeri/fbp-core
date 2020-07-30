import { IFbpNode } from './node';

export interface IFbpInitPacket {
	cmd: string; // TODO: specific specific commands
	payload: { path: string, state: IFbpNode }; // Specify interface for this
}
