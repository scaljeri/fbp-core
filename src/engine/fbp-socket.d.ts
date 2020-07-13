import { Observable, Subscription } from 'rxjs';
import { IFbpSocket, FbpSocketId } from '../types/socket';
import { FbpSocketTypes } from '../constants';
export declare class FbpSocket {
    config: IFbpSocket;
    output$: Observable<any>;
    private output;
    constructor(config: IFbpSocket);
    subscribe(cb: (data: any) => void): Subscription;
    emit(value: any): void;
    get id(): FbpSocketId;
    get type(): FbpSocketTypes;
    get dataType(): string;
}
