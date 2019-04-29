import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import moment from "moment";
import * as service from "../services/service";

import "./workflow-flow.less";

@Component
export default class WorkflowGraph extends Vue {
    @Prop() options: any;

    steps: any = [];
    async mounted() {
        let data = await service.getWorkflowFlowData(this.options);
        console.log('flowdata', data);
        if(data) {
            this.steps = data.steps || [];
        }
    }

    renderStep(step:any) {
        let ret = step.tasks.map( (t:any) => {
            return <div class="workflow-step">
            <a-icon type="user" class={ step.state == 1 ? 'workflow-step-finished' : 'workflow-step-processing' } />
            { t.name} {t.message}
            </div>
        })

        return <div>
            <div>{step.nodeName}</div>
            <div>{ ret }</div>
        </div>
    }

    renderState(state: number) {
        if(state == 1) {
            return 'finish';
        } else if(state == 2) {
            return 'process';
        }

        return 'wait';
    }

    render(h:any) {
        return <div class="workflow-graph">
        <a-steps size="small" labelPlacement="horizontal" class="workflow-steps">
        {
            this.steps.map((step: any) => {
                return <a-step status={ this.renderState(step.state) } title={step.name} description={this.renderStep(step)} />
            } )
        }
        </a-steps>
        </div>
    }
}

