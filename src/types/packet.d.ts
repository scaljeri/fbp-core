export interface IFbpPacket<T = any> {
    socketId: string;
    payload: T;
}
