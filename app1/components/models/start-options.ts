

export interface StartWorkflowData {
    error: number;
    message?: string;
    extra?: any;
}

export declare class StartOptions {
    static Data: StartWorkflowData;

    bizTypeCode:string;
    rgCode:string;
    unitCode:string;
    businessKey: string;
    userId: string;
    /**
     * 开始流程后，如果需要指派人的时候，要弹出审批窗口
     */
    onCheckUserRequired: (data: any) => void;

    /**
     * 启动完成回调
     */
    onComplete: (data: StartWorkflowData) => void;
}
