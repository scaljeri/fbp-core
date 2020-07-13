import { FbpSocketId } from './socket';
import { FbpNodeId } from './node';
export declare type IFbpConnectionId = string;
export interface IFbpConnection {
    from: FbpSocketId;
    to: FbpSocketId;
    dataType?: string;
    id?: IFbpConnectionId;
    fromNodeId?: FbpNodeId;
    toNodeId?: FbpNodeId;
}
