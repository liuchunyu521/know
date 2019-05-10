export interface ReturnData {
    error: number;
    message?: string;
}
export interface Options {
    procDefId: string;
    procInstId: string;
    nodeId: string;
    onComplete: (data: ReturnData) => void;
}
