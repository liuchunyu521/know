const modeler_base:any = process.env.NODE_ENV == "development" ? "http://10.16.21.29:8888/fbpm-modeler" : "http://10.16.21.29:8888/fbpm-modeler";
// const base = "http://localhost:5000";
const flow_center_base:any = process.env.NODE_ENV == "development" ? "http://10.16.21.29:8889/fbpm-process" : "http://10.16.21.29:8889/fbpm-process"


const config:any = {
    
    PAYMENT_SAVED_LIST_URL: modeler_base + "/api/listByPageSaved",
    PAYMENT_TASK_LIST_URL: modeler_base + "/api/listByPageTask",
    PAYMENT_DETAIL_URL: modeler_base + "/api/getExpenseEntityById",
    PAYMENT_SAVE_URL: modeler_base + "/api/addExpenseEntity",
    PAYMENT_UPDATE_URL: modeler_base + "/api/updateExpenseEntity",
    PAYMENT_DELETE_URL: modeler_base + "/api/deleteExpenseEntity",
    PAYMENT_SUBMIT_URL: modeler_base + "/api/submitExpenseEntity",
    PAYMENT_STATE_URL: modeler_base + "/api/changeExpenseEntityStatus",
    
    
    FLOW_NODES_URL: modeler_base + "/api/changeExpenseEntityStatus",
    
    WORKFLOW_START_URL: flow_center_base +  "/api/runtime/fbpm-process-instances",
    
    NODE_ATTR_URL: modeler_base + "/api/flowNode/getNodeInfo",
    NODE_STEPS_URL: modeler_base + "/api/flowNode/getNextNodes",
    NODE_TYPES_URL: modeler_base + "/api/identity/identityType",
    NODE_CATALOG_URL: modeler_base + "/api/identity/identityType/list",
    APPROVE_URL: flow_center_base + "/api/runtime/fbpm-approve-tasks",

    NODE_USER_LIST_URL: modeler_base + "/api/identity/identityList",

    NODE_BACK_NODE_INFO_URL: flow_center_base +  "/api/back/getBackToNodeInfo",
    NODE_BACK_NODE_LIST_URL: flow_center_base +  "/api/back/getBackToNodeInfo",

    // 是否可撤销
    NODE_CAN_REVOKE_URL: flow_center_base +  "/api/cancelTask/isPermitCancelTask",

    WORK_FLOW_GRAPH: "http://192.168.137.68:8889/f",

    getNodeBackActionUrl(procInstId:string) {
        return flow_center_base +  `/api/runtime/fbpm-process-instances/${procInstId}/change-state`;
    }
};

export default config;