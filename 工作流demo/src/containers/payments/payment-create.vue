<script lang="tsx">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import moment from "moment";

import '../../libs/styles/style.less';
import workflow, {
  canTaskRevoke,
  revoke,
  startWorkflow
} from "../../libs";

// import workflow, {
//   canTaskRevoke,
//   revoke,
//   startWorkflow
// } from "../../../components/src";

// 通过初始化组件的时候，绑定流程中心的ip地址
// flowModelerBaseUrl: 流程模型的地址
// flowCenterBaseUrl: 流程中心的地址
console.log('use workflow');
Vue.use(workflow);

// 创建表单预设
const formDefinedData = {
  // 单据类型code
  bizTypeCode: "EXP_TRIP",
  // 区划code
  rgCode: "87",
  // 单位code
  unitCode: ""
};

const formItemLayout = {
  labelCol: {
    xs: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 17 }
  }
};

enum FormActionState {
  Approve = 2, // 审核
  Revoke = 3, // 撤销
  Back = 4 // 回退
}

@Component
export default class PaymentCreate extends Vue {
  payment: any;
  items: Array<any> = [];
  total: number = 0;
  form: any;
  isApprove: boolean = false;
  // 是否驳回
  isReject: boolean = false;

  // 是否可撤销
  isRevoke: boolean = false;

  _id: string = "";
  _taskId: any = "";
  _procDefId: any = "";
  _nodeId: any = "";
  _processId: any = "";
  _status: number = 0;
  //_appCode: any = "";
  options: any = null;

  @Action getPaymentDetail: any;
  @Action statePayment: any;
  @Action updatePayment: any;
  @Action savePayment: any;
  @Action submitPayment: any;
  @Action updateFlowInstIdToPayment:any;
  created() {
    console.log("create");
    this.form = this.$form.createForm(this);
    console.log("created", this.$route.query);
    this._id = this.$route.params.id;
    this._procDefId = this.$route.query.procDefId || "";
    this._nodeId = this.$route.query.nodeId || "";
    this._taskId = this.$route.query.taskId || "";
    this._processId = this.$route.query.processId || "";
    this._status = Number(this.$route.query.status) || 0;
    //this._appCode = this.$route.query.appCode || "";

    this.options = {
      taskId: this._taskId,
      procDefId: this._procDefId,
      nodeId: this._nodeId,
      procInstId: this._processId
    };
  }
  async mounted() {

    workflow.config({
      debug: true,
      userCode: sessionStorage.getItem('code'), 
      authToken: 'Bearer ' + 'aaaaa',
      flowModelerBaseUrl: 'http://10.10.65.184:8888/fbpm-modeler',
      flowProcessBaseUrl: 'http://10.10.65.184:8889/fbpm-process'
    })
    
    this._id = this.$route.params.id;
    console.log("id", this._id);
    if (this._id) {
      let data = await this.getPaymentDetail(this._id);
      this.items = data.items || [];
      this.payment = data;
      this.total = data.sum;
    } else {
      this.addItem();
    }

    this.isRevoke = await canTaskRevoke(this.options);
  }
  addItem() {
    let items = this.items;
    items.push({
      id: Date.now(),
      type: "1",
      sum: 0,
      description: "",
      count: 0
    });
  }

  submit() {
    console.log("submit");
    this.form.validateFields(async (err: any, values: any) => {
      console.log(err, values);
      let data = {
        deptName: values.deptName || "",
        username: values.username || "",
        date: moment(values.date).unix(),
        reason: values.description || "",
        type: values.type,
        sum: this.total,
        state: values.state,
        items: this.items.map((i, index) => {
          return {
            type: values["type" + index],
            sum: values["sum" + index],
            description: values["description" + index],
            count: values["count" + index]
          };
        })
      };
      console.log("data", data);
      let formData:any;
      if (!this._id) {
        formData = await this.savePayment(data);
        this._id = formData.businessKey;
      };

      console.log("savePayment", formData);

      // 启动流程
      startWorkflow({
        ...formDefinedData,
        businessKey: this._id,
        userCode: sessionStorage.getItem("code") || "",

        // 是否在启动流程是要指派人
        onCheckUserRequired: (data: any) => {
          console.log('onCheckUserRequired', data);

          // 绑定表单

          // 打开工作流审批窗口
          this.isApprove = true;
          let workflowApprove:any = this.$refs.workflowApprove;
          workflowApprove.reinit(data);

          // 调用业务系统的接口将流程实例绑定到表单数据
          this.updateFlowInstIdToPayment({
              procInstId: data.procInstId,
              businessKey:data.businessKey
          });

        },
        // 完成后的回调
        // ret
        //    error: 错误标记，0: 没有错误
        //                    1: 错误
        //    message: 错误消息
        //    extra:  附加的回传数据, 不同接口要求不同
        onComplete: (ret: any) => {
          if (ret.error) {
            this.$notification.open({
              message: "错误",
              description: ret.message
            });
            return;
          }

          // 将流程实例id更新回业务系统
          // extra = {
          //   procInstId,
          //   businessKey
          //}
          this.updateFlowInstIdToPayment(ret.extra);

          this.$router.push("/payment/list");
        }
      });
    });
  }

  save() {
    // this.isApprove = true;
    // return;
    this.form.validateFields(async (err: any, values: any) => {
      console.log(err, values);
      let data = {
        id: this._id,
        deptName: values.deptName || "",
        username: values.username || "",
        date: moment(values.date).unix(),
        reason: values.description || "",
        type: values.type,
        sum: this.total,
        state: values.state,
        items: this.items.map((i, index) => {
          return {
            type: values["type" + index],
            sum: values["sum" + index],
            description: values["description" + index],
            count: values["count" + index]
          };
        })
      };
      console.log("data", data);
      if (this._id) {
        await this.updatePayment({ id: this._id, ...data });
      } else {
        await this.savePayment(data);
      }

      this.$router.push("/payment/list");
    });
  }

  reject() {
    this.isReject = true;
    // this.statePayment({
    //   id: this._id,
    //   taskId: this._taskId,
    //   processState: FormActionState.Back,
    //   comment: "退回"
    // });
  }

  approve() {
    this.isApprove = true;
  }

  calc() {
    let total = this.items.reduce((cur, item) => item.sum + cur, 0);
    console.log("total", total);
    this.total = total;
  }

  render(h: any) {
    const { getFieldDecorator } = this.form;
    const payment = this.payment;
    return (
      <div title="">
        <div class="page-header">
          <div class="action-button">
            <a-icon type="arrow-left" onClick={() => this.$router.back()} />
          </div>
          <div class="title">经费报销单</div>
        </div>
        <div>
          <workflow-flow direction="horizontal" options={this.options} />
        </div>
        <a-form {...formItemLayout}>
          <a-collapse
            defaultActiveKey={["1"]}
            bordered={false}
            expandIcon={({ isActive }: any) => (
              <a-icon type="caret-right" rotate={isActive ? 90 : 0} />
            )}
          >
            <a-collapse-panel header="基本信息" key="1" class="panel-content">
              <a-row align="middle">
                <a-col span={12}>
                  <a-form-item
                    labelCol={{ xs: 4 }}
                    wrapperCol={{ xs: 8 }}
                    label="报销部门"
                  >
                    {getFieldDecorator("deptName", {
                      initialValue: payment && payment.deptName,
                      rules: [{ require: true, message: "报销部门" }]
                    })(
                      <a-select>
                        <a-select-option value="平台产品部">
                          平台产品部
                        </a-select-option>
                        <a-select-option value="财务部">财务部</a-select-option>
                      </a-select>
                    )}
                  </a-form-item>
                </a-col>
                <a-col span={12}>
                  <a-form-item
                    labelCol={{ xs: 4 }}
                    wrapperCol={{ xs: 8 }}
                    label="经办人"
                  >
                    {getFieldDecorator("username", {
                      initialValue: payment && payment.username,
                      rules: [{ required: true, message: "请输入经办人" }]
                    })(<a-input placeholder="" />)}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row align="middle">
                <a-col span={12}>
                  <a-form-item
                    labelCol={{ xs: 4 }}
                    wrapperCol={{ xs: 8 }}
                    label="报销日期"
                  >
                    {getFieldDecorator("date", {
                      initialValue: payment && moment(payment.date * 1000)
                    })(
                      <a-date-picker
                        defaultValue={moment(new Date(), "YYYY-MM-DD")}
                      />
                    )}
                  </a-form-item>
                </a-col>
                <a-col span={12}>
                  <a-form-item
                    labelCol={{ xs: 4 }}
                    wrapperCol={{ xs: 8 }}
                    label="发票状态"
                  >
                    {getFieldDecorator("state", {
                      initialValue: payment ? `${payment.state}` : "1"
                    })(
                      <a-select>
                        <a-select-option value="1">状态1</a-select-option>
                        <a-select-option value="2">状态2</a-select-option>
                      </a-select>
                    )}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-item
                    labelCol={{ xs: 2 }}
                    wrapperCol={{ xs: 22 }}
                    label="报销事由"
                  >
                    {getFieldDecorator("reason", {
                      initialValue: payment && payment.reason
                    })(<a-input />)}
                  </a-form-item>
                </a-col>
              </a-row>
              <a-row>
                <a-col>
                  <a-form-item
                    labelCol={{ xs: 2 }}
                    wrapperCol={{ xs: 5 }}
                    label="经费来源"
                  >
                    {getFieldDecorator("type", {
                      initialValue: payment ? `${payment.type}` : "1"
                    })(
                      <a-select>
                        <a-select-option value="1">来源1</a-select-option>
                        <a-select-option value="2">来源2</a-select-option>
                      </a-select>
                    )}
                  </a-form-item>
                </a-col>
              </a-row>
            </a-collapse-panel>
            <a-collapse-panel
              header="报销明细"
              key="2"
              class="panel-content item-container"
            >
              {this.items.map((item: any, index: number) => {
                return (
                  <div key={item.id} class="item-content">
                    <a-row>
                      <a-col span={12}>
                        <a-form-item
                          labelCol={{ xs: 4 }}
                          wrapperCol={{ xs: 8 }}
                          label="费用类别"
                        >
                          {getFieldDecorator("type" + index, {
                            initialValue: `${item.type}`
                          })(
                            <a-select>
                              <a-select-option value="1">类别1</a-select-option>
                              <a-select-option value="2">类别2</a-select-option>
                            </a-select>
                          )}
                        </a-form-item>
                      </a-col>
                      <a-col span={12}>
                        <a-form-item
                          labelCol={{ xs: 4 }}
                          wrapperCol={{ xs: 8 }}
                          label="报销金额"
                        >
                          {getFieldDecorator("sum" + index, {
                            initialValue: item.sum || 0,
                            change: (v: any) => {
                              item.sum = v;
                              this.calc();
                            }
                          })(<a-input-number />)}
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col>
                        <a-form-item
                          labelCol={{ xs: 2 }}
                          wrapperCol={{ xs: 22 }}
                          label="报告说明"
                        >
                          {getFieldDecorator("description" + index, {
                            initialValue: item.description
                          })(<a-textarea />)}
                        </a-form-item>
                      </a-col>
                    </a-row>
                    <a-row>
                      <a-col span={24}>
                        <a-form-item labelCol={{ xs: 2 }} label="参训人数">
                          {getFieldDecorator("count" + index, {
                            initialValue: item.count
                          })(<a-input-number />)}
                        </a-form-item>
                      </a-col>
                    </a-row>
                    {this.items.length > 1 && (
                      <div class="item-delete">
                        <a-icon
                          theme="twoTone"
                          type="delete"
                          onClick={() => {
                            let items = this.items;
                            let idx = items.findIndex(i => i.id == item.id);
                            if (idx > -1) {
                              items.splice(idx, 1);
                              this.calc();
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              <div class="item-total">
                支出合计: <div class="number">{this.total}</div>
                <div class="item-add">
                  <a-button type="primary" onClick={() => this.addItem()}>
                    增加明细
                  </a-button>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-form>
        <div class="page-action">
          {
            <span>
              {this._status != 3 && (
                <a-button type="primary" onClick={this.save.bind(this)}>
                  保存
                </a-button>
              )}

              {(!this.payment || (this.payment && !this.payment.processId)) && (
                <a-button onClick={this.submit.bind(this)}>提交</a-button>
              )}
            </span>
          }

          {this.payment && this.payment.processId && (
            <span>
              { this._status != 3 && this._taskId && this._procDefId && this._nodeId && (
                <a-button type="primary" onClick={this.approve.bind(this)}>
                  审核
                </a-button>
              )}

              {this.isRevoke && (
                <a-button
                  onClick={() =>
                    revoke({
                      ...this.options,
                      onComplete: (ret: any) => {
                        console.log("revoke complete", ret);
                        if (ret.error) {
                          this.$notification.open({
                            message: "错误",
                            description: ret.message
                          });
                          return;
                        }
                        this.$router.push("/payment/list");
                      }
                    })
                  }
                >
                  撤销
                </a-button>
              )}
              {this._processId && this._procDefId && this._nodeId && (
                <a-button onClick={this.reject.bind(this)}>驳回</a-button>
              )}
            </span>
          )}
        </div>
        <workflow-approve
          ref="workflowApprove"
          visible={this.isApprove}
          options={this.options}
          onCancel={() => (this.isApprove = false)}
          onComplete={(ret: any) => {
            console.log("onComplete", ret);
            if (ret.error) {
              let message = {
                message: "错误",
                description: ret.message
              };
              this.$notification.open(message);
              return;
            }
            this.isApprove = false;
            this.$router.push("/payment/list");
          }}
        />
        <workflow-reject
          title={"驳回"}
          visible={this.isReject}
          options={this.options}
          onCancel={() => (this.isReject = false)}
          onComplete={(ret: any) => {
            console.log("workflow-reject complete", ret);
            if (ret.error) {
              let message = {
                message: "错误",
                description: ret.message
              };
              this.$notification.open(message);
              return;
            }

            this.isReject = false;

            this.$router.push("/payment/list");
          }}
        />
      </div>
    );
  }
}
</script>

