const address = {
    modeler_base: '',
    flow_process_base: '',
};
function getModelerBase() {
    console.log('getModelerBase', address.modeler_base);
    return address.modeler_base;
}
function getFlowCenterBase() {
    return address.flow_process_base;
}
class Config {
    constructor() {
        this._userCode = '';
        this._authToken = '';
        this._debug = false;
    }
    get userCode() {
        return this._userCode;
    }
    get authToken() {
        return this._authToken;
    }
    get debug() {
        return this._debug;
    }
    get WORKFLOW_START_URL() {
        return getFlowCenterBase() + "/api/runtime/fbpm-process-instances";
    }
    get NODE_INFO_URL() {
        return getModelerBase() + "/api/flowNode/getNodeInfo";
    }
    get NODE_STEPS_URL() {
        return getModelerBase() + "/api/flowNode/getNextNodes";
    }
    get NODE_TYPES_URL() {
        return getModelerBase() + "/api/identity/identityType";
    }
    get NODE_CATALOG_URL() {
        return getModelerBase() + "/api/identity/identityType/list";
    }
    APPROVE_BY_TASKID_URL(taskId) {
        return getFlowCenterBase() + `/api/runtime/fbpm-approve-tasks/${taskId}`;
    }
    APPROVE_BY_BUSSINESSKEY_URL(businessKey) {
        return getFlowCenterBase() + `/api/runtime/fbpm-approve-tasks-form/${businessKey}`;
    }
    get NODE_USER_LIST_URL() {
        return getModelerBase() + "/api/identity/identityList";
    }
    get NODE_BACK_NODE_INFO_URL() {
        return getFlowCenterBase() + "/api/back/getBackToNodeInfo";
    }
    get NODE_BACK_NODE_LIST_URL() {
        return getFlowCenterBase() + "/api/back/getBackToAnyNodeInfos";
    }
    ;
    // 是否可撤销
    get NODE_CAN_REVOKE_URL() {
        return getFlowCenterBase() + "/api/cancelTask/isPermitCancelTask";
    }
    // 批语列表
    get WORKFLOW_REMARK_LIST_URL() {
        return getFlowCenterBase() + "/api/runtime/comlang";
    }
    // 保存批语
    WORKFLOW_REMARK_SAVE_URL() {
        return getFlowCenterBase() + `/api/runtime/comlang/save `;
    }
    // 删除批语
    WORKFLOW_REMARK_DELETE_URL(id) {
        return getFlowCenterBase() + `/api/runtime/comlang/delete/${id}`;
    }
    // 星标批语
    WORKFLOW_REMARK_STAR_URL() {
        return getFlowCenterBase() + `/api/runtime/comlang/setstar`;
    }
    // 驳回url
    getNodeBackActionUrl(procInstId) {
        return getFlowCenterBase() + `/api/runtime/fbpm-tasks-back/${procInstId}`;
    }
    getNodeTrackUrl(procInstId) {
        return getFlowCenterBase() + `/api/query/track-tasks/${procInstId}`;
    }
    setBaseAddress(flowModelerBaseUrl, flowProcessBaseUrl) {
        console.log('setBaseAddress', flowModelerBaseUrl, flowProcessBaseUrl);
        address.flow_process_base = flowProcessBaseUrl;
        address.modeler_base = flowModelerBaseUrl;
    }
    setUserCode(code) {
        this._userCode = code;
    }
    setAuthToken(token) {
        this._authToken = token;
    }
    setDebug(debug) {
        this._debug = debug;
    }
}
;
export default new Config();
