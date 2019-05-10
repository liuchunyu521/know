import { Vue } from "vue-property-decorator";
interface User {
    userCode: string;
    userName: string;
    deptName: string;
    unitName: string;
}
export default class WorkflowApprove extends Vue {
    approveText: string;
    remarks: Array<any>;
    searchText: string;
    userPage: number;
    userPageCount: number;
    userTotal: number;
    userList: Array<User>;
    nodeDataMap: Map<string, any>;
    currentKeys: Array<string>;
    userMap: Map<string, User>;
    node: any;
    steps: Array<any>;
    selectedNodeId: string;
    nextIsPreemptMode: boolean;
    nextNodeIsMultiple: boolean;
    defaultType: any;
    types: Array<any>;
    catalog: Array<any>;
    defaultCatalogId: string;
    visible: boolean;
    options: any;
    onOk(e: any): Promise<{
        error: number;
        message: string;
    }>;
    onCancel(e: any): boolean;
    readonly locale: {
        emptyText: string;
    };
    readonly users: (User | undefined)[];
    mounted(): Promise<void>;
    /**
     * 再次修改options后打开组件
     * @param options
     */
    reinit(options: any): Promise<void>;
    /**
     * 选择左侧树节点查询人员
     */
    selectTreeNode(keys: any): Promise<void>;
    /**
     * 选择下一步节点
     */
    onNodeStepChange(e: any): Promise<void>;
    /**
     * 选择参与人类型
     */
    handleTypeChange(v: any): Promise<void>;
    /**
     * 搜索参与人
     */
    onSearch(v: string): void;
    /**
     * 选择批语
     */
    handleWordChange(v: any): void;
    /**
     * 输入批语
     */
    onInputChange(e: any): void;
    /**
     * 删除选择用户
     */
    onRemoveUser(u: User): void;
    /**
     * 星标批语
     */
    starRemarkItem(remark: any): Promise<void>;
    deleteRemarkItem(remark: any): Promise<void>;
    selectRemarkItem(remark: any): void;
    readonly rowSelection: {
        type: string;
        onChange: (selectedRowKeys: any, selectedRows: any) => void;
        selectedRowKeys: string[];
    };
    render(h: any): any;
    private searchUserList;
    private buildTreeNode;
    private showTreeNode;
    private getUser;
    private getRemarkList;
}
export {};
