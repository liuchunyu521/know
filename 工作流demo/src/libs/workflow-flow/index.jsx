var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Vue } from "vue-property-decorator";
import * as service from "../services";
//import '../styles/style.less'
let WorkflowGraph = class WorkflowGraph extends Vue {
    //import '../styles/style.less'
    constructor() {
        super(...arguments);
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
        let ret = step.task ? step.task.map((t) => {
            return <div class="workflow-step">
            <a-icon type="user" class={step.status == 1 ? 'workflow-step-finished' : 'workflow-step-processing'}/>
            {t.userId || ''} {t.message}
            </div>;
        }) : <div />;
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
__decorate([
    Prop()
], WorkflowGraph.prototype, "options", void 0);
__decorate([
    Prop({ default: 'horizontal' })
], WorkflowGraph.prototype, "direction", void 0);
WorkflowGraph = __decorate([
    Component
], WorkflowGraph);
export default WorkflowGraph;
