var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import * as service from "../services";
import config from "../services/config";
import { Modal } from 'ant-design-vue';
// import '../styles/style.less'
const PAGE_SIZE = 10;
const columns = [
    {
        title: "单位",
        dataIndex: "unitName",
        key: "unitName"
    },
    {
        title: "部门",
        dataIndex: "deptName",
        key: "deptName"
    },
    {
        title: "姓名",
        dataIndex: "userName",
        key: "userName"
    },
    {
        title: "编号",
        dataIndex: "userCode",
        key: "userCode"
    }
];
let WorkflowApprove = class WorkflowApprove extends Vue {
    constructor() {
        super(...arguments);
        // 当前批语
        this.approveText = "同意";
        // 批语列表
        this.remarks = [];
        this.searchText = '';
        this.userPage = 0;
        this.userPageCount = 1;
        this.userTotal = 0;
        this.userList = [];
        this.nodeDataMap = new Map();
        this.currentKeys = [];
        this.userMap = new Map();
        this.node = {};
        this.steps = [];
        this.selectedNodeId = "";
        // 抢占
        this.nextIsPreemptMode = false;
        // 会签
        this.nextNodeIsMultiple = false;
        this.defaultType = "";
        this.types = [];
        this.catalog = [];
        this.defaultCatalogId = "";
    }
    async onOk(e) {
        let err = { error: 0, message: '' };
        this.nodeDataMap.set(this.selectedNodeId, this.currentKeys);
        // let data: any = [];
        // this.nodeDataMap.forEach(function (value, key) {
        //   data.push({ nodeId: key, users: value });
        // });
        let id = this.options.taskId || this.options.businessKey;
        if (config.debug && !id) {
            this.$notification.error({
                message: "错误",
                description: 'taskId|businessKey not found in options'
            });
            throw { message: 'taskId|businessKey not found in options' };
        }
        let approve = this.options.taskId ? service.approveByTaskId : service.approveByBusinessKey;
        try {
            // 当前节点是否允许选人
            if (this.node.isCheckUsers == "1") {
                // 如果下一节点为抢占模式
                if (this.nextIsPreemptMode) {
                    await approve(id, {
                        action: "complete",
                        users: this.currentKeys || [],
                        message: this.approveText
                    });
                }
                else { // 非抢占
                    // 是否会签
                    if (this.nextNodeIsMultiple) {
                        await approve(id, {
                            action: "complete",
                            assignee: "",
                            assigneeList: this.currentKeys || [],
                            message: this.approveText
                        });
                    }
                    else { // 非会签
                        await approve(id, {
                            action: "complete",
                            assignee: this.currentKeys ? this.currentKeys[0] : "",
                            message: this.approveText
                        });
                    }
                }
            }
            else {
                // 不选人直接送审
                await approve(id, {
                    action: "complete",
                    message: this.approveText
                });
            }
        }
        catch (e) {
            err.error = 1,
                err.message = e.message || e;
        }
        return err;
    }
    onCancel(e) {
        return false;
    }
    get locale() {
        return { emptyText: '当前没有数据' };
    }
    get users() {
        return this.currentKeys.map((key) => this.getUser(key));
    }
    // updated() {
    //   if (this.visible) {
    //   }
    // }
    async mounted() {
        console.log("options", this.options);
        this.reinit(this.options);
    }
    /**
     * 再次修改options后打开组件
     * @param options
     */
    async reinit(options) {
        //this.options = options;
        this.options.taskId = options.taskId;
        this.options.procDefId = options.procDefId;
        this.options.nodeId = options.nodeId;
        console.log("options", options);
        // 获取节点属性
        this.node = await service.getNodeAttr(options);
        console.log("node", this.node);
        // 获取批语列表
        this.getRemarkList();
        // 获取节点步骤
        this.steps = await service.getNodeNextSteps({
            ...options,
            appCode: this.node.appCode
        });
        if (this.steps && this.steps.length > 0) {
            let node = this.steps[0];
            this.selectedNodeId = node.nodeId;
            console.log('next', node);
            this.nextIsPreemptMode = node.isPreemptMode == "1";
            this.nextNodeIsMultiple = node.isMultiinstance == "1";
            console.log('selectedNodeId', this.selectedNodeId);
            this.types = await service.getNodeParticipantTypes({
                ...options,
                nodeId: this.selectedNodeId,
                appCode: this.node.appCode
            }) || [];
            if (this.types && this.types.length > 0) {
                this.defaultType = this.types[0].type;
                this.handleTypeChange(this.defaultType);
            }
        }
    }
    /**
     * 选择左侧树节点查询人员
     */
    async selectTreeNode(keys) {
        console.log('selectTreeNode', keys);
        if (keys && keys.length > 0) {
            this.defaultCatalogId = keys[0];
        }
        this.searchText = "";
        this.searchUserList(this.defaultType, this.defaultCatalogId, 1, "");
    }
    /**
     * 选择下一步节点
     */
    async onNodeStepChange(e) {
        console.log(`onNodeStepChange`, e.target.value);
        this.nodeDataMap.set(this.selectedNodeId, this.currentKeys);
        this.selectedNodeId = e.target.value;
        let node = this.steps.find((n) => n.nodeId == this.selectedNodeId);
        console.log('next', node);
        this.nextIsPreemptMode = node.isPreemptMode == "1";
        this.nextNodeIsMultiple = node.isMultiinstance == "1";
        this.currentKeys = this.nodeDataMap.get(this.selectedNodeId) || [];
        this.types = await service.getNodeParticipantTypes({
            procDefId: this.options.procDefId,
            nodeId: e.target.value,
            appCode: this.node && this.node.appCode,
            rgCode: this.node && this.node.rgCode,
            unitCode: this.node && this.node.unitCode
        });
        if (this.types && this.types.length > 0) {
            this.defaultType = this.types[0].type;
            this.handleTypeChange(this.defaultType);
        }
    }
    /**
     * 选择参与人类型
     */
    async handleTypeChange(v) {
        console.log("handleTypeChange", v);
        let data = await service.getParticipantCatalog({
            procDefId: this.options.procDefId,
            nodeId: this.selectedNodeId,
            appCode: this.node && this.node.appCode,
            rgCode: this.node && this.node.rgCode,
            unitCode: this.node && this.node.unitCode,
            type: v
        });
        this.catalog = this.buildTreeNode(data);
        if (this.catalog && this.catalog.length > 0) {
            // 
        }
    }
    /**
     * 搜索参与人
     */
    onSearch(v) {
        console.log("search", v);
        this.searchText = v;
        this.searchUserList(this.defaultType, this.defaultCatalogId, 1, v);
    }
    /**
     * 选择批语
     */
    handleWordChange(v) {
        console.log(`selected`, v);
        this.approveText = v;
    }
    /**
     * 输入批语
     */
    onInputChange(e) {
        console.log(`onInputChange`, e);
        this.approveText = e.target.value;
    }
    /**
     * 删除选择用户
     */
    onRemoveUser(u) {
        console.log(`onRemoveUser`, u);
        let index = this.currentKeys.indexOf(u.userCode);
        if (index > -1) {
            this.currentKeys.splice(index, 1);
        }
    }
    /**
     * 星标批语
     */
    async starRemarkItem(remark) {
        //e.preventDefault();
        console.log(`starRemarkItem`, remark);
        await service.starRemark({
            id: remark.id,
            flag: remark.flag == 1 ? 0 : 1
        });
        this.getRemarkList();
    }
    async deleteRemarkItem(remark) {
        console.log(`deleteRemarkItem`, remark);
        Modal.confirm({
            title: '确定要删除该批语吗?',
            //content: '点击确定删除, ',
            okText: "确认",
            cancelText: "取消",
            onOk: async () => {
                await service.deleteRemark(remark.id);
                this.getRemarkList();
            },
            onCancel() { },
        });
    }
    selectRemarkItem(remark) {
        console.log(`selectRemarkItem`, remark);
        this.approveText = remark.text;
    }
    // 选择参与人
    get rowSelection() {
        return {
            type: (this.nextIsPreemptMode || this.nextNodeIsMultiple) ? "checkbox" : "radio",
            onChange: (selectedRowKeys, selectedRows) => {
                let unselectedKeys = (this.userList || [])
                    .map((u) => u.userCode)
                    .filter(v => !selectedRowKeys.includes(v));
                //this.selectedKeys = selectedRowKeys;
                console.log("pages", unselectedKeys);
                let keys = this.currentKeys.filter((key) => unselectedKeys.indexOf(key) == -1);
                selectedRows.forEach((row) => {
                    if (keys.indexOf(row.userCode) == -1) {
                        keys.push(row.userCode);
                    }
                    if (!this.userMap.has(row.userCode)) {
                        this.userMap.set(row.userCode, row);
                    }
                });
                this.currentKeys = keys;
            },
            selectedRowKeys: this.currentKeys
        };
    }
    render(h) {
        return (<a-modal title="审批" class="workflow workflow-approve" onCancel={this.onCancel} onOk={(e) => this.onOk(e)} visible={this.visible} maskClosable={false} footer={[
            <a-button key="back" onClick={this.onCancel}>
            取消
          </a-button>,
            <a-button key="submit" type="primary" onClick={this.onOk}>
            确定
          </a-button>
        ]}>
        {this.node &&
            (this.node.isCheckUsers == "1") && (<div>
              <a-row class="workflow-line bottom">
                <span class="title">下一步骤:</span>
                <a-radio-group value={this.selectedNodeId} onChange={this.onNodeStepChange}>
                  {this.steps.map(step => (<a-radio value={step.nodeId}>{step.nodeName}</a-radio>))}
                </a-radio-group>
              </a-row>
              <a-row class="workflow-line bottom">
                <a-col span={8} class="workflow-approve-tree">
                  <a-select class="workflow-approve-tree-search" defaultValue={this.defaultType} style={{ width: 120 }} onChange={this.handleTypeChange}>
                    {this.types.map(t => (<a-select-option value={t.type}>{t.name}</a-select-option>))}
                  </a-select>
                  <a-tree checkable={false} showLine={true} onSelect={this.selectTreeNode}>
                    {this.showTreeNode(h, this.catalog)}
                  </a-tree>
                </a-col>
                <a-col span={16} class="workflow-approve-list">
                  <div class="workflow-approve-list-header">
                    <a-input-search placeholder="请输入姓名进行搜索" onSearch={this.onSearch} style={{ width: 200 }}/>
                  </div>
                  <div>
                    <a-table bordered rowKey="userCode" class="workflow-approve-list-table" locale={this.locale} pagination={{
            current: this.userPage,
            pageSize: PAGE_SIZE,
            total: this.userTotal,
            //size: "small",
            onChange: (page) => {
                this.userPage = page;
                console.log("page", page);
                this.searchUserList(this.defaultType, this.defaultCatalogId, page, this.searchText);
            }
        }} rowSelection={this.rowSelection} dataSource={[...this.userList]} columns={columns} scroll={{ y: 120 }}/>
                  </div>
                </a-col>
              </a-row>
              <a-row class="workflow-approve-select">
                <a-col span={2}>已选人员</a-col>
                <a-col span={22}>
                  <div class="workflow-approve-tags">
                    {this.users.map((u) => (<a-tag closable onClose={() => this.onRemoveUser(u)}>
                        {u.userName}
                      </a-tag>))}
                  </div>
                </a-col>
              </a-row>
            </div>)}
        <a-row class="workflow-line bottom">
          <a-col class="title left-tag">审批意见</a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <span class="title">常用批语:</span>
            <a-dropdown class="workflow-remark-button">
              <a-menu slot="overlay" class="workflow-remark">
                {this.remarks && this.remarks.length > 0 ?
            this.remarks.map((remark) => <a-menu-item key={remark.id}>
                        <span class="workflow-remark-text" onClick={(e) => {
                this.selectRemarkItem(remark);
            }}>{remark.text}</span>
                        {remark.type == 'private' &&
                <span class="workflow-remark-actions">
                            <a-icon onClick={(e) => {
                    this.starRemarkItem(remark);
                }} type="star" theme={remark.flag && "filled"}/>
                            <a-icon onClick={() => this.deleteRemarkItem(remark)} type="delete"/>
                          </span>}
                      </a-menu-item>) : <a-menu-item>当前还没有批语</a-menu-item>}
              </a-menu>
              <a-button style="margin-left: 8px">
                点击选择批语 <a-icon type="down"/>
              </a-button>
            </a-dropdown>
          </a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-textarea rows={3} value={this.approveText} placeholder="请输入批语" onChange={this.onInputChange}/>
          </a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-button type="primary" disabled={!this.approveText} ghost onClick={async () => {
            await service.saveRemark({
                appCode: this.node.appCode,
                text: this.approveText
            });
            this.getRemarkList();
        }}>
              另存为新批语
            </a-button>
          </a-col>
        </a-row>
      </a-modal>);
    }
    async searchUserList(type, key, pageNum, name) {
        let param = {
            type: this.defaultType,
            id: key,
            name: name,
            pageNum: pageNum,
            pageSize: 10,
            appCode: (this.node && this.node.appCode) || '',
            rgCode: (this.node && this.node.rgCode) || '',
            unitCode: (this.node && this.node.unitCode) || '',
        };
        console.log('searchUserList', param);
        let data = await service.getParticipantList(param);
        if (data) {
            this.userList = data.rows;
            this.userTotal = data.total;
            this.userPage = data.page;
        }
    }
    buildTreeNode(list) {
        let temp = {};
        let tree = [];
        for (let i in list) {
            temp[list[i].id] = list[i];
        }
        for (let i in temp) {
            if (temp[i].pId) {
                if (!temp[temp[i].pId].children) {
                    temp[temp[i].pId].children = [];
                }
                temp[temp[i].pId].children.push(temp[i]);
            }
            else {
                tree.push(temp[i]);
            }
        }
        return tree;
    }
    showTreeNode(h, data) {
        return data.map((item) => {
            if (item.children && item.children.length > 0) {
                return (<a-tree-node key={item.id} title={item.name}>
            {this.showTreeNode(h, item.children)}
          </a-tree-node>);
            }
            return (<a-tree-node key={item.id} title={item.name} onClick={() => this.selectTreeNode(item)}/>);
        });
    }
    getUser(id) {
        let u = this.userMap.get(id);
        return u;
    }
    // 获取批语列表
    async getRemarkList() {
        this.remarks = await service.getRemarkList({
            appCode: this.node.appCode,
            userCode: config.userCode,
            size: 10
        });
    }
};
__decorate([
    Prop({ default: false })
], WorkflowApprove.prototype, "visible", void 0);
__decorate([
    Prop()
], WorkflowApprove.prototype, "options", void 0);
__decorate([
    Emit("complete")
], WorkflowApprove.prototype, "onOk", null);
__decorate([
    Emit("cancel")
], WorkflowApprove.prototype, "onCancel", null);
WorkflowApprove = __decorate([
    Component
], WorkflowApprove);
export default WorkflowApprove;
