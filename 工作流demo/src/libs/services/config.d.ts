declare class Config {
    _userCode: string;
    _authToken: string;
    _debug: boolean;
    readonly userCode: string;
    readonly authToken: string;
    readonly debug: boolean;
    readonly WORKFLOW_START_URL: string;
    readonly NODE_INFO_URL: string;
    readonly NODE_STEPS_URL: string;
    readonly NODE_TYPES_URL: string;
    readonly NODE_CATALOG_URL: string;
    APPROVE_BY_TASKID_URL(taskId: string): string;
    APPROVE_BY_BUSSINESSKEY_URL(businessKey: string): string;
    readonly NODE_USER_LIST_URL: string;
    readonly NODE_BACK_NODE_INFO_URL: string;
    readonly NODE_BACK_NODE_LIST_URL: string;
    readonly NODE_CAN_REVOKE_URL: string;
    readonly WORKFLOW_REMARK_LIST_URL: string;
    WORKFLOW_REMARK_SAVE_URL(): string;
    WORKFLOW_REMARK_DELETE_URL(id: string): string;
    WORKFLOW_REMARK_STAR_URL(): string;
    getNodeBackActionUrl(procInstId: string): string;
    getNodeTrackUrl(procInstId: string): string;
    setBaseAddress(flowModelerBaseUrl: string, flowProcessBaseUrl: string): void;
    setUserCode(code: string): void;
    setAuthToken(token: string): void;
    setDebug(debug: boolean): void;
}
declare const _default: Config;
export default _default;
