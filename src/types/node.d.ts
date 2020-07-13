import { IFbpSocket } from './socket';
export declare type FbpNodeId = string;
export interface IFbpPosition {
    top: number;
    left: number;
}
export declare type FbpUIMode = 'fullscreen' | 'active' | 'normal';
export interface IFbpNodeUI {
    position?: IFbpPosition;
    mode?: FbpUIMode;
    index?: number;
}
export interface IFbpNode<T = any> {
    id?: FbpNodeId;
    parentId?: FbpNodeId;
    type?: string;
    config?: T;
    sockets?: IFbpSocket[];
    ui?: IFbpNodeUI;
    async?: boolean;
    autoStart?: boolean;
}
