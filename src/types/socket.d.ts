import { FbpSocketTypes, FbpSocketPositions } from '../constants/socket.enum';
export declare type FbpSocketId = string;
export interface IFbpSocket {
    id?: FbpSocketId;
    type: FbpSocketTypes;
    color?: string;
    label?: string;
    dataType?: any;
    side?: FbpSocketPositions;
}
