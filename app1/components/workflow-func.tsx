import Vue from 'vue';
import { Options, FbpmStatus, StartOptions, StartWorkflowData } from './models';
import * as service from './services/service';
import WorkflowReject from './workflow-reject/workflow-reject';

Vue.component('workflow-revoke', WorkflowReject);
/**
 * 回退
 */
export function reject(options: Options) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    new Vue({
        el: div,
        mounted: () => {
            
        },
        render: (h:any) => {
            return <workflow-revoke title="驳回" visible={true} options={options} />
        }
      });
}


export async function canTaskRevoke(options: Options) {
    let data = await service.canTaskRevoke(options);

    console.log('canTaskRevoke', data, data.permitCancel,  data.permitCancel === "1");
    return data.permitCancel === "1";
}

/**
 * 提交
 */
export async function submit(options: Options) {
  let node = await service.getNodeAttr(options);

  // 判断节点是否需要指派人
  if(node.isCheckUsers == "1") {
     
  }
    
}

export async function startWorkflow(options: StartOptions) {
    let ret: StartWorkflowData = { error: 0, message: ''};
    try{
      let data:any = await service.startWorkflow(options);
      console.log('startWorkflow', data);
      if(data) {
         // 获取节点信息
         let node:any = await service.getNodeAttr({
           procDefId: data.processDefinitionId,
           nodeId: data.nodeId
         });

         // 如果需要指派人，则回调返回审批窗口
         if(node.isCheckUsers === "1") {
            if(options.onCheckUserRequired) {
              options.onCheckUserRequired({
                  taskId: data.taskId,
                  nodeId: data.nodeId,
              });
            }
            return;
         }

         // 直接送审
         await service.approve(data.taskId, {
           action: "complete",
           message: ''
         });

         // 将流程实例id和businessKey返回到业务系统
         ret.extra = {
              procInstId: data.id,
              businessKey: options.businessKey
         }

      }
    }catch(e) {
        ret.error = 1;
        ret.message = e.message;
    }

    // 完成
    if(options.onComplete) {
      options.onComplete(ret);
    }
}


export async function revoke(options: Options) {

    let ret: any = { error: 0 }
    try {

        // 获取要撤销的上一节点的id
        let nodes = await service.getNodeNextSteps(options);
        if(nodes && nodes.length > 0) {
          await service.revoke(options.procInstId, {
            // 要撤销的节点的id
            cancelActivityIds: [ nodes[0].nodeId ],
      
            // 要退回到的节点id
            startActivityIds: [ options.nodeId ]
          });
        }
      
    }catch(e) {
      ret.error = 1,
      ret.message = e.message || e;
    }
    
    if(options.onComplete) {
        options.onComplete(ret);
    }
}