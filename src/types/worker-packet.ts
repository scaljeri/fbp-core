
export interface IFbpInitPacket {
	cmd: string; // TODO: specific specific commands
	payload: { path: string, cls?: string }; // Specify interface for this
}
