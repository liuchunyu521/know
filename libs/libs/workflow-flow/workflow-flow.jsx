import * as tslib_1 from "tslib";
import { Component, Prop, Vue } from "vue-property-decorator";
import * as service from "../services/service";
import "./workflow-flow.less";
let WorkflowGraph = class WorkflowGraph extends Vue {
    constructor() {
        super(...arguments);
        // 如果是竖向显示传值 为:vertical
        this.direction = 'horizontal';
        this.steps = [];
    }
    async mounted() {
        let data = await service.getWorkflowFlowData(this.options);
        console.log('flowdata', data);
        if (data) {
            this.steps = data || [];
        }
    }
    renderStep(h, step) {
        let ret = step.task.map((t) => {
            return <div class="workflow-step">
            <a-icon type="user" class={step.status == 1 ? 'workflow-step-finished' : 'workflow-step-processing'}/>
            {t.userId || ''} {t.message}
            </div>;
        });
        return <div>
            
            <div>{ret}</div>
        </div>;
    }
    renderState(state) {
        if (state == 1) {
            return 'finish';
        }
        else if (state == 2) {
            return 'process';
        }
        return 'wait';
    }
    renderStepIcon(h, state) {
        if (state == 1) {
            return <a-icon type="check-circle" class="workflow-step-finished"/>;
        }
        else if (state == 2) {
            return <a-icon type="loading" class="workflow-step-processing"/>;
        }
        return <a-icon type="loading" class="workflow-step-processing"/>;
    }
    render(h) {
        return <div class="workflow-graph">
        <a-steps direction={this.direction} size="small" labelPlacement="horizontal" class="workflow-steps">
        {this.steps.map((step) => {
            return <a-step icon={this.renderStepIcon(h, step.status)} status={this.renderState(step.status)} title={step.nodeName} description={this.renderStep(h, step)}/>;
        })}
        </a-steps>
        </div>;
    }
};
tslib_1.__decorate([
    Prop()
], WorkflowGraph.prototype, "options", void 0);
tslib_1.__decorate([
    Prop()
], WorkflowGraph.prototype, "direction", void 0);
WorkflowGraph = tslib_1.__decorate([
    Component
], WorkflowGraph);
export default WorkflowGraph;
//# sourceMappingURL=workflow-flow.jsx.map