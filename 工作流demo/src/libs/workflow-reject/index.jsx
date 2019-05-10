var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import * as service from "../services";
import { FbpmStatus } from '../models';
import { Modal } from 'ant-design-vue';
//import '../styles/style.less'
const columns = [
    {
        title: "节点名称",
        dataIndex: "nodeName",
        key: "nodeName"
    },
];
var NodeType;
(function (NodeType) {
    NodeType[NodeType["Prev"] = 1] = "Prev";
    NodeType[NodeType["First"] = 2] = "First";
    NodeType[NodeType["Any"] = 3] = "Any";
})(NodeType || (NodeType = {}));
let WorkflowReject = class WorkflowReject extends Vue {
    constructor() {
        super(...arguments);
        // 批语列表
        this.remarks = [];
        this.text = '';
        this.nodeType = NodeType.Prev;
        this.selectedNodeId = '';
        this.nodes = [];
        this.title = '';
    }
    async onOk(e) {
        let ret = { error: 0, message: '' };
        try {
            let selectedNodeId = '';
            if (this.nodeType == NodeType.Prev || this.nodeType == NodeType.First) {
                let node = await service.getBackNodeInfo({
                    backType: this.getNodeServerType(this.nodeType),
                    procDefId: this.options.procDefId,
                    procInstId: this.options.procInstId,
                    nodeId: this.options.nodeId
                });
                selectedNodeId = node.nodeId;
            }
            else {
                selectedNodeId = this.backNode.nodeId;
            }
            console.log('getBackNodeInfo', selectedNodeId);
            await service.revoke(this.options.procInstId, {
                // 要撤销的节点的id
                cancelActivityIds: [this.node.nodeId],
                // 要退回到的节点id
                startActivityIds: [selectedNodeId]
            });
        }
        catch (e) {
            ret.error = 1,
                ret.message = e.message || e;
        }
        return ret;
    }
    onCancel(e) {
        return false;
    }
    async mounted() {
        console.log("work-revoke mounted", this.options);
        // 获取节点属性
        this.node = await service.getNodeAttr(this.options);
        console.log("node", this.node);
        // 获取批语列表
        this.getRemarkList();
    }
    async onNodeTypeChanged(e) {
        console.log('onNodeTypeChanged', e.target.value);
        this.nodeType = e.target.value;
        if (this.nodeType == NodeType.Any) {
            // 获取可返回的节点列表
            let data = await service.getAvaliableBackNodeList({
                procInstId: this.options.procInstId,
                nodeId: this.options.nodeId
            });
            this.nodes = data || [];
        }
    }
    selectNode(node) {
        console.log('selectNode', node);
        this.selectedNodeId = node.nodeId;
        this.backNode = node;
    }
    /**
     * 输入批语
     */
    onInputChange(e) {
        console.log(`onInputChange`, e);
        this.text = e.target.value;
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
        this.text = remark.text;
    }
    render(h) {
        return (<a-modal title={this.title} class="workflow workflow-revoke" onCancel={this.onCancel} onOk={(e) => this.onOk(e)} visible={this.visible} footer={[
            <a-button key="back" onClick={this.onCancel}>
            取消
          </a-button>,
            <a-button key="submit" type="primary" onClick={this.onOk}>
            确定
          </a-button>
        ]}>
        {(this.node && this.node.isReject == '0') && <div>
            <a-row class="workflow-line">
              <span class="title left-tag">选择节点</span>
              <span>
                <a-radio-group onChange={this.onNodeTypeChanged} value={this.nodeType}>
                  <a-radio value={1}>上一节点</a-radio>
                  <a-radio value={2}>第一节点</a-radio>
                  <a-radio value={3}>任一节点</a-radio>
                </a-radio-group>
              </span>
            </a-row>
            <a-row>
              <a-col>
                <a-list class="workflow-revoke-list" bordered={true} locale={{ emptyText: '请选择任一节点' }} dataSource={this.nodes} renderItem={(item) => <a-list-item class={`workflow-revoke-item ${item.nodeId == this.selectedNodeId ? 'active' : ''}`} onClick={() => this.selectNode(item)}>{item.nodeName}</a-list-item>}>
                </a-list>
              </a-col>
            </a-row>
          </div>}
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
            <a-textarea rows={3} value={this.text} placeholder="请输入批语" onChange={this.onInputChange}/>
          </a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-button type="primary" ghost disabled={!this.text} onClick={async () => {
            await service.saveRemark({
                appCode: this.node.appCode,
                text: this.text
            });
            this.getRemarkList();
        }}>
              另存为新批语
            </a-button>
          </a-col>
        </a-row>
      </a-modal>);
    }
    getNodeServerType(type) {
        let ret = '';
        switch (type) {
            case NodeType.Prev:
                ret = FbpmStatus.ACTION_BACK_PREV;
                break;
            case NodeType.First:
                ret = FbpmStatus.ACTION_BACK_FIRST;
                break;
        }
        return ret;
    }
    // 获取批语列表
    async getRemarkList() {
        this.remarks = await service.getRemarkList({
            appCode: this.node.appCode,
            //userCode: config.userCode,
            size: 10
        });
    }
};
__decorate([
    Prop()
], WorkflowReject.prototype, "title", void 0);
__decorate([
    Prop({ default: false })
], WorkflowReject.prototype, "visible", void 0);
__decorate([
    Prop()
], WorkflowReject.prototype, "options", void 0);
__decorate([
    Emit("complete")
], WorkflowReject.prototype, "onOk", null);
__decorate([
    Emit("cancel")
], WorkflowReject.prototype, "onCancel", null);
WorkflowReject = __decorate([
    Component
], WorkflowReject);
export default WorkflowReject;
