import WorkflowApprove from './workflow-approve';
import WorkflowReject from './workflow-reject';
import { reject, canTaskRevoke, revoke, startWorkflow } from './workflow-func';
export { WorkflowApprove, WorkflowReject };
export { reject, canTaskRevoke, revoke, startWorkflow };
declare function setConfig(options: any): void;
declare function install(vue: any): void;
declare const _default: {
    install: typeof install;
    config: typeof setConfig;
};
export default _default;
