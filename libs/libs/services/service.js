const isDev = process.env.NODE_ENV === "development";
import api from './api';
import config from './config';
/**
 * 启动流程
 * @param req
 *  userId ：流程发起人（必须项）
    processDefinitionId：流程定义Id（可选项）
    processDefinitionKey：流程定义key（可选项）
    message：消息（可选项）
    bizTypeCode：单据类型code
    rgCode：区划code
    unitCode：单位code
    businessKey：业务Id（必须项）
 */
export function startWorkflow(req) {
    return api.post(config.WORKFLOW_START_URL, req);
}
/**
 * 获取节点属性
 * url: localhost:8082/fbpm-modeler/api/flowNode/getNodeInfo
   请求方式：GET
   请求参数： procDefId(流程定义Id)  nodeId(节点Id)
   响应:
   {
     "code":200,
     "data":{
       "procDefId":"",
       "nodeId":"",
       "nodeName":"",
       "isMultiinstance":"",
       "isPreemptMode":"", //1：抢占   0：非抢占
       "isCheckUsers":"", //1：指派  0:非指派
       "isReject":""      //1：设置驳回  0:无
     }
   }
 */
export function getNodeAttr(req) {
    return api.get(config.NODE_ATTR_URL, req);
}
/**
 * 获取当前节点的下一节点列表
 * @param req
 */
export function getNodeNextSteps(req) {
    return api.get(config.NODE_STEPS_URL, req);
}
/**
 * 获取参与人类型
 * @param req
 */
export function getNodeParticipantTypes(req) {
    return api.get(config.NODE_TYPES_URL, req);
}
/**
 * 根据参与人类型获取树状目录
 * @param req
 */
export function getParticipantCatalog(req) {
    return api.get(config.NODE_CATALOG_URL, req);
}
/**
 * 获取参与人分页列表
 * @param req
 */
export function getParticipantList(req) {
    return api.get(config.NODE_USER_LIST_URL, req);
}
/**
 * 获取直线流程图数据
 * @param req
 */
export function getWorkflowFlowData(req) {
    return api.get(config.getNodeGraphActionUrl(req.procInstId), {});
}
/**
 * 审批
 * @param taskId 任务id
 * @param req
 */
export function approve(taskId, req) {
    return api.post(`${config.APPROVE_URL}/${taskId}`, req, false);
}
/**
 * 获取上一节点，或其它节点的信息
 * @param req
 */
export function getBackNodeInfo(req) {
    return api.get(`${config.NODE_BACK_NODE_INFO_URL}`, req);
}
/**
 * 获取可以驳回的节点列表
 * @param req
 */
export function getAvaliableBackNodeList(req) {
    return api.get(`${config.NODE_BACK_NODE_INFO_URL}`, req);
}
/**
 * 撤销
 * @param procInstId 流程实例id
 * @param req
 */
export function revoke(procInstId, req) {
    return api.post(config.getNodeBackActionUrl(procInstId), req, false);
}
/**
 * 是否可撤销
 * @param procInstId
 * @param req
 */
export function canTaskRevoke(req) {
    return api.get(config.NODE_CAN_REVOKE_URL, req);
}
/**
 * 回退
 */
export function back() {
}
//# sourceMappingURL=service.js.map