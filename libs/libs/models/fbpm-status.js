export var FbpmStatus;
(function (FbpmStatus) {
    /**
     * 启动流程
     */
    FbpmStatus["ACTION_INPUT"] = "input";
    /**
     * 审核中
     */
    FbpmStatus["ACTION_COMPLETE"] = "complete";
    /**
     * 回退到上一个任务节点
     */
    FbpmStatus["ACTION_BACK_PREV"] = "back_prev";
    /**
     * 回退到第一个任务节点
     */
    FbpmStatus["ACTION_BACK_FIRST"] = "back_first";
    /**
     * 回退到任一个任务节点
     */
    FbpmStatus["ACTION_BACK_ANY"] = "back_any";
    /**
     * 撤回 或者 收回 或者撤销
     */
    FbpmStatus["ACTION_RECALL"] = "cancel";
    /**
     * 认领
     */
    FbpmStatus["ACTION_CLAIM"] = "claim";
    /**
     * 委托
     */
    FbpmStatus["ACTION_DELEGATE"] = "delegate";
    /**
     * 审核中（委托任务）
     */
    FbpmStatus["ACTION_RESOLVE"] = "resolve";
    /**
     * 自由跳转
     */
    FbpmStatus["ACTION_JUMP"] = "jump";
    /**
     * 传阅
     */
    FbpmStatus["ACTION_CIRCULATE"] = "circulate";
})(FbpmStatus || (FbpmStatus = {}));
//# sourceMappingURL=fbpm-status.js.map