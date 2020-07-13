import { FbpSocket } from './fbp-socket';
import { IFbpConnection, IFbpConnectionId } from '../types/connection';
export declare class FbpConnection {
    private from;
    private to;
    private config;
    private subscription;
    constructor(from: FbpSocket, to: FbpSocket, config: IFbpConnection);
    destroy(): void;
    get id(): IFbpConnectionId;
    get dataType(): string;
    get inSocket(): FbpSocket;
    get outSocket(): FbpSocket;
}
