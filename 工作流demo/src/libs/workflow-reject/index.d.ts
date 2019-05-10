import { Vue } from "vue-property-decorator";
declare enum NodeType {
    Prev = 1,
    First = 2,
    Any = 3
}
export default class WorkflowReject extends Vue {
    node: any;
    remarks: Array<any>;
    text: string;
    nodeType: NodeType;
    selectedNodeId: any;
    nodes: Array<any>;
    backNode: any;
    title: string;
    visible: boolean;
    options: any;
    onOk(e: any): Promise<{
        error: number;
        message: string;
    }>;
    onCancel(e: any): boolean;
    mounted(): Promise<void>;
    onNodeTypeChanged(e: any): Promise<void>;
    selectNode(node: any): void;
    /**
     * 输入批语
     */
    onInputChange(e: any): void;
    /**
     * 星标批语
     */
    starRemarkItem(remark: any): Promise<void>;
    deleteRemarkItem(remark: any): Promise<void>;
    selectRemarkItem(remark: any): void;
    render(h: any): any;
    private getNodeServerType;
    private getRemarkList;
}
export {};
