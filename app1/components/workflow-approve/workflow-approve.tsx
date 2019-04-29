import { Component, Prop, Vue, Emit } from "vue-property-decorator";
//import { Getter, Action, State } from "vuex-class";
//import moment from "moment";
import * as service from "../services/service";

import "./workflow-approve.less";

// const a-radio-group = a-radio.Group;
// const { a-tree-node } = a-tree;
// const a-select-option = a-select.a-select-option;
// const a-input-search = a-input.a-input-search;

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

interface User {
  userCode: string;
  userName: string;
  deptName: string;
  unitName: string;
}

@Component
export default class WorkflowApprove extends Vue {
  approveText: string = "";

  userPage: number = 0;
  userPageCount: number = 1;
  userTotal: number = 0;

  userList: Array<User> = [];
  nodeDataMap: Map<string, any> = new Map();
  currentKeys: Array<string> = [];
  userMap: Map<string, User> = new Map();

  node: any = {};
  steps: Array<any> = [];
  selectedNodeId: string = "";
  // 抢占
  nextIsPreemptMode: boolean = false;
  // 会签
  nextNodeIsMultiple: boolean = false;

  defaultType: any = "";
  types: Array<any> = [];

  catalog: Array<any> = [];
  defaultCatalogId: string = "";

  @Prop() visible: boolean = false;
  // @Prop() nodeId: string = "";
  // @Prop() procDefId: string = "";
  @Prop() options: any;

  @Emit("complete")
  async onOk(e: any) {

    let err = { error: 0, message: '' };
    this.nodeDataMap.set(this.selectedNodeId, this.currentKeys);
    // let data: any = [];
    // this.nodeDataMap.forEach(function (value, key) {
    //   data.push({ nodeId: key, users: value });
    // });

    try {
      // 当前节点是否允许选人
      if (this.node.isCheckUsers == "1") {

        // 如果下一节点为抢点模式
        if (this.nextIsPreemptMode) {
          await service.approve(this.options.taskId, {
            action: "complete",
            users: this.currentKeys || [],
            message: this.approveText
          });
        } else {  // 非抢占

          // 是否会签
          if (this.nextNodeIsMultiple) {
            await service.approve(this.options.taskId, {
              action: "complete",//审核类型
              assignee: "",
              assigneeList: this.currentKeys || [],//会签参与人
              message: this.approveText
            });
          } else { // 非会签
            await service.approve(this.options.taskId, {
              action: "complete",//审核类型
              assignee: this.currentKeys ? this.currentKeys[0] : "",
              message: this.approveText
            });
          }
        }
      } else {
        // 不选人直接送审
        await service.approve(this.options.taskId, {
          action: "complete",
          message: this.approveText
        });
      }
    } catch (e) {
      err.error = 1,
        err.message = e.message || e;
    }

    return err;
  }

  @Emit("cancel")
  onCancel(e: any) {
    return false;
  }
  get locale() {
    return { emptyText: '当前没有数据' };
  }

  get users() {
    return this.currentKeys.map((key: string) => this.getUser(key));
  }

  // updated() {
  //   if (this.visible) {
  //   }
  // }

  async mounted() {
    console.log("options", this.options);
    // 获取节点属性
    this.node = await service.getNodeAttr(this.options);
    console.log("node", this.node);
    // 获取节点步骤
    this.steps = await service.getNodeNextSteps({
      ...this.options,
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
        ...this.options,
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
  async selectTreeNode(keys: any) {
    console.log('selectTreeNode', keys);
    if (keys && keys.length > 0) {
      this.defaultCatalogId = keys[0];
    }

    this.searchUserList(this.defaultType, this.defaultCatalogId, "");
  }

  /**
   * 选择下一步节点
   */
  async onNodeStepChange(e: any) {
    console.log(`onNodeStepChange`, e.target.value);

    this.nodeDataMap.set(this.selectedNodeId, this.currentKeys);
    this.selectedNodeId = e.target.value;

    let node = this.steps.find((n: any) => n.nodeId == this.selectedNodeId);
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
  async handleTypeChange(v: any) {
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
  onSearch(v: string) {
    console.log("search", v);
    this.searchUserList(this.defaultType, this.defaultCatalogId, v);
  }

  /**
   * 选择批语
   */
  handleWordChange(v: any) {
    console.log(`selected`, v);
    this.approveText = v;
  }

  /**
   * 输入批语
   */
  onInputChange(e: any) {
    console.log(`onInputChange`, e);
    this.approveText = e.target.value;
  }

  /**
   * 删除选择用户
   */
  onRemoveUser(u: User) {
    console.log(`onRemoveUser`, u);
    let index = this.currentKeys.indexOf(u.userCode);
    if (index > -1) {
      this.currentKeys.splice(index, 1);
    }
  }

  // 选择参与人
  get rowSelection() {
    return {
      type: (this.nextIsPreemptMode || this.nextNodeIsMultiple) ? "checkbox" : "radio",
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        let unselectedKeys = (this.userList || [])
          .map((u: User) => u.userCode)
          .filter(v => !selectedRowKeys.includes(v));
        //this.selectedKeys = selectedRowKeys;
        console.log("pages", unselectedKeys);
        let keys = this.currentKeys.filter(
          (key: string) => unselectedKeys.indexOf(key) == -1
        );
        selectedRows.forEach((row: User) => {
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
  render(h: any) {
    return (
      <a-modal
        title="审批"
        class="workflow workflow-approve"
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
        {this.node &&
          (this.node.isPreemptMode == "1" ||
            this.node.isCheckUsers == "1" ||
            this.node.isMultiinstance == "1") && (
            <div>
              <a-row class="workflow-line bottom">
                <span class="title">下一步骤:</span>
                <a-radio-group
                  value={this.selectedNodeId}
                  onChange={this.onNodeStepChange}
                >
                  {this.steps.map(step => (
                    <a-radio value={step.nodeId}>{step.nodeName}</a-radio>
                  ))}
                </a-radio-group>
              </a-row>
              <a-row class="workflow-line bottom">
                <a-col span={8} class="workflow-approve-tree">
                  <a-select
                    class="workflow-approve-tree-search"
                    defaultValue={this.defaultType}
                    style={{ width: 120 }}
                    onChange={this.handleTypeChange}
                  >
                    {this.types.map(t => (
                      <a-select-option value={t.type}>{t.name}</a-select-option>
                    ))}
                  </a-select>
                  <a-tree
                    checkable={false}
                    showLine={true}
                    onSelect={this.selectTreeNode}
                  >
                    {this.showTreeNode(h, this.catalog)}
                  </a-tree>
                </a-col>
                <a-col span={16} class="workflow-approve-list">
                  <div class="workflow-approve-list-header">
                    <a-input-search
                      placeholder="请输入姓名进行搜索"
                      onSearch={this.onSearch}
                      style={{ width: 200 }}
                    />
                  </div>
                  <div>
                    <a-table
                      bordered
                      rowKey="userCode"
                      class="workflow-approve-list-table"
                      locale={this.locale}
                      pagination={{
                        current: this.userPage,
                        pageSize: 10,
                        total: this.userTotal,
                        //size: "small",
                        onChange: (page: any) => {
                          this.userPage = page;
                          console.log("page", page);
                        }
                      }}
                      rowSelection={this.rowSelection}
                      dataSource={[...this.userList]}
                      columns={columns}
                      scroll={{ y: 120 }}
                    />
                  </div>
                </a-col>
              </a-row>
              <a-row class="workflow-approve-select">
                <a-col span={2}>已选人员</a-col>
                <a-col span={22}>
                  <div class="workflow-approve-tags">
                    {this.users.map((u: any) => (
                      <a-tag closable onClose={() => this.onRemoveUser(u)}>
                        {u.userName}
                      </a-tag>
                    ))}
                  </div>
                </a-col>
              </a-row>
            </div>
          )}
        <a-row class="workflow-line bottom">
          <a-col class="title left-tag">审批意见</a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <span class="title">常用批语:</span>
            <a-select
              defaultValue="同意"
              class="workflow-approve-select-words"
              onChange={this.handleWordChange}
            >
              <a-select-option value="通过">通过</a-select-option>
              <a-select-option value="同意">同意</a-select-option>
            </a-select>
          </a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-input
              value={this.approveText}
              placeholder="请输入批语"
              onChange={this.onInputChange}
            />
          </a-col>
        </a-row>
        <a-row class="workflow-line">
          <a-col>
            <a-button type="primary" ghost>
              另存为新批语
            </a-button>
          </a-col>
        </a-row>
      </a-modal>
    );
  }

  private async searchUserList(type: string, key: string, name: string) {
    let param = {
      type: this.defaultType,
      id: key,
      name: name,
      pageNum: 1,
      pageSize: 10,
      appCode: this.node && this.node.appCode,
      rgCode: this.node && this.node.rgCode,
      unitCode: this.node && this.node.unitCode,
    };
    console.log('searchUserList', param);
    let data = await service.getParticipantList(param);
    if (data) {
      this.userList = data.rows;
      this.userTotal = data.total;
      this.userPage = data.page;
    }
  }

  private buildTreeNode(list: Array<any>) {
    let temp: any = {};
    let tree: any = [];
    for (let i in list) {
      temp[list[i].id] = list[i];
    }
    for (let i in temp) {
      if (temp[i].pId) {
        if (!temp[temp[i].pId].children) {
          temp[temp[i].pId].children = [];
        }
        temp[temp[i].pId].children.push(temp[i]);
      } else {
        tree.push(temp[i]);
      }
    }
    return tree;
  }

  private showTreeNode(h: any, data: any) {
    return data.map((item: any) => {
      if (item.children && item.children.length > 0) {
        return (
          <a-tree-node key={item.id} title={item.name}>
            {this.showTreeNode(h, item.children)}
          </a-tree-node>
        );
      }
      return (
        <a-tree-node
          key={item.id}
          title={item.name}
          onClick={() => this.selectTreeNode(item)}
        />
      );
    });
  }

  private getUser(id: string) {
    let u = this.userMap.get(id);
    return u;
  }
}
