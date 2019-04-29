import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import * as service from "../services/service";
import { FbpmStatus } from '../models';
import "./workflow-reject.less";

const columns = [
  {
    title: "节点名称",
    dataIndex: "nodeName",
    key: "nodeName"
  },

];

interface Node {
  nodeName: string;
}

enum NodeType {
  Prev = 1,
  First = 2,
  Any = 3
}

@Component
export default class WorkflowReject extends Vue {

  node: any;

  text: string = '';
  nodeType: NodeType = NodeType.Prev;
  selectedNodeId: any = '';
  nodes: Array<any> = [];
  backNode: any;

  @Prop() title: string = '';
  @Prop() visible: boolean = false;
  @Prop() options: any;

  @Emit("complete")
  async onOk(e: any) {

    let ret = { error: 0, message: '' }
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
      } else {
        selectedNodeId = this.backNode.id;
      }
  
      console.log('getBackNodeInfo', selectedNodeId);
      await service.revoke(this.options.procInstId, {
        // 要撤销的节点的id
        cancelActivityIds: [ this.node.nodeId],
  
        // 要退回到的节点id
        startActivityIds: [ selectedNodeId ]
      });
    }catch(e) {
      ret.error = 1,
      ret.message = e.message || e;
    }

    return ret;
  }

  @Emit("cancel")
  onCancel(e: any) {
    return false;
  }

  async mounted() {
    console.log("work-revoke mounted", this.options);
    // 获取节点属性
    this.node = await service.getNodeAttr(this.options);
    console.log("node", this.node);

  }

  async onNodeTypeChanged(e: any) {
    console.log('onNodeTypeChanged', e.target.value);
    this.nodeType = e.target.value;

    if (this.nodeType == NodeType.Any) {

      // 获取可返回的节点列表
      let data = await service.getAvaliableBackNodeList({

      });

      this.nodes = data || [];
    }
  }

  selectNode(node: any) {
    console.log('selectNode', node);
    this.backNode = node;
  }

  /**
   * 输入批语
   */
  onInputChange(e: any) {
    console.log(`onInputChange`, e);
    this.text = e.target.value;
  }

  render(h: any) {
    return (
      <a-modal
        title={this.title}
        class="workflow workflow-revoke"
        onCancel={this.onCancel}
        onOk={(e: any) => this.onOk(e)}
        visible={this.visible}
        footer={[
          <a-button key="back" onClick={this.onCancel}>
            取消
          </a-button>,
          <a-button key="submit" type="primary" onClick={this.onOk}>
            确定
          </a-button>
        ]}
      >
        {
          (this.node && this.node.isReject == '0') && <div>
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
                <a-list
                  class="workflow-revoke-list"
                  bordered={true}
                  locale={{ emptyText: '请选择任一节点' }}
                  dataSource={this.nodes}
                  renderItem={(item: any) => <a-list-item class={`workflow-revoke-item ${item.id == this.selectedNodeId ? 'active' : ''}`} onClick={() => this.selectNode(item)}>{item.name}</a-list-item>}
                >
                </a-list>
              </a-col>
            </a-row>
          </div>
        }
        <a-row class="workflow-line">
          <a-col class="title left-tag">审批意见</a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-input
              value={this.text}
              placeholder="请输入批语"
              onChange={this.onInputChange}
            />
          </a-col>
        </a-row>
      </a-modal>
    );
  }

  private getNodeServerType(type: NodeType): string {
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

}
