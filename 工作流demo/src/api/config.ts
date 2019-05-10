const base = process.env.NODE_ENV == 'development' ? 'http://10.10.65.184:17001' : "";
//const base = "http://localhost:5000";
export default {
    PAYMENT_SAVED_LIST_URL: base + '/api/listByPageSaved',
    PAYMENT_TASK_LIST_URL: base + '/api/listByPageTask',
    PAYMENT_FINISH_LIST_URL: base + '/api/listByPageFinishedTask',

    PAYMENT_DETAIL_URL: base + '/api/getExpenseEntityById',
    PAYMENT_SAVE_URL: base + '/api/addExpenseEntity',
    PAYMENT_UPDATE_URL: base + '/api/updateExpenseEntity',
    PAYMENT_DELETE_URL: base + '/api/deleteExpenseEntity',
    PAYMENT_SUBMIT_URL: base + '/api/submitExpenseEntity',
    PAYMENT_STATE_URL: base + '/api/changeExpenseEntityStatus',
    PAYMENT_UPDATE_FLOW_INST_ID_URL: base + '/api/updateProcInstId',

    FLOW_NODES_URL: base + '/api/changeExpenseEntityStatus',
}