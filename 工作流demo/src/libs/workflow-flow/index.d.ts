import { Vue } from "vue-property-decorator";
export default class WorkflowGraph extends Vue {
    options: any;
    direction: string;
    steps: any;
    mounted(): Promise<void>;
    renderStep(h: any, step: any): any;
    renderState(state: number): "finish" | "wait" | "process";
    renderStepIcon(h: any, state: number): any;
    render(h: any): any;
}
