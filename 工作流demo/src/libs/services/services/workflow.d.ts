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
export declare function startWorkflow(req: any): Promise<any>;
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
export declare function getNodeAttr(req: any): Promise<any>;
/**
 * 获取当前节点的下一节点列表
 * @param req
 */
export declare function getNodeNextSteps(req: any): Promise<any>;
/**
 * 获取参与人类型
 * @param req
 */
export declare function getNodeParticipantTypes(req: any): Promise<any>;
/**
 * 根据参与人类型获取树状目录
 * @param req
 */
export declare function getParticipantCatalog(req: any): Promise<any>;
/**
 * 获取参与人分页列表
 * @param req
 */
export declare function getParticipantList(req: any): Promise<any>;
/**
 * 获取直线流程图数据
 * @param req
 */
export declare function getWorkflowFlowData(req: any): Promise<any>;
/**
 * 审批
 * @param taskId 任务id
 * @param req
 */
export declare function approveByTaskId(taskId: string, req: any): Promise<any>;
/**
 * 审批
 * @param businessKey 单据key
 * @param req
 */
export declare function approveByBusinessKey(businessKey: string, req: any): Promise<any>;
/**
 * 获取上一节点，或其它节点的信息
 * @param req
 */
export declare function getBackNodeInfo(req: any): Promise<any>;
/**
 * 获取可以驳回的节点列表
 * @param req
 *        procInstId(流程实例Id)
 *        nodeId(当前节点Id)
 */
export declare function getAvaliableBackNodeList(req: any): Promise<any>;
/**
 * 撤销
 * @param procInstId 流程实例id
 * @param req
 */
export declare function revoke(procInstId: string, req: any): Promise<any>;
/**
 * 是否可撤销
 * @param procInstId
 * @param req
 */
export declare function canTaskRevoke(req: any): Promise<any>;
/**
 * 回退
 */
export declare function back(): void;
