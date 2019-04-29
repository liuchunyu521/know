

export interface ReturnData {
    error: number;
    message?: string;
}

export declare class Options {
    static Data: ReturnData;

    procDefId:string;
    procInstId:string;
    nodeId:string;
    onComplete: (data:ReturnData) => void;
}
