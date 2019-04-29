import WorkflowApprove from './workflow-approve/workflow-approve';
import WorkflowReject from './workflow-reject/workflow-reject';
import WorkflowFlow from './workflow-flow/workflow-flow';
import { reject, canTaskRevoke, revoke, startWorkflow } from './workflow-func';
export { WorkflowApprove, WorkflowReject };
export { reject, canTaskRevoke, revoke, startWorkflow };

function install(vue: any) {
    
    vue.component('workflow-approve', WorkflowApprove);
    vue.component('workflow-reject', WorkflowReject);
    vue.component('workflow-flow', WorkflowFlow);
}
  
export default { install }