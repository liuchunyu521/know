# 组件及方法说明
> 组件及方法说明

[toc]

## 启动工作流

`startWorkflow`

| key  | 类型 |　说明 |
| ------|-------| -------|
| options  | object | 入参选项    |

参数：
```javascript
{
  // 单据类型code（必填）
  bizTypeCode: "EXP_TRIP",

  // 区划code（可选）
  rgCode: "87",

  // 单位code（可选）
  unitCode: "",

  // 单据id（必填）
  businessKey: "aaaa",

  // 完成回调
  // 完成后的回调
  // ret
  //    error: 错误标记，0: 没有错误
  //                    1: 错误
  //    message: 错误消息
  //    extra:  附加的回传数据, 不同接口要求不同
  onComplete: (ret) => {
        // 将流程实例id更新回业务系统
        // extra = {
        //   procInstId,
        //   businessKey
        //}
  },

   // 是否在启动流程是要指派人
  onCheckUserRequired: (data) => {
      // 打开工作流审批窗口
        this.isApprove = true;
        let workflowApprove:any = this.$refs.workflowApprove;
        workflowApprove.reinit(data);

          // 调用业务系统的接口将流程实例绑定到表单数据
          this.updateFlowInstIdToPayment({
              procInstId: data.procInstId,
              businessKey:data.businessKey
          });
  }

}
```

## 工作流审批

| key  | 类型 |　说明 |
| ------|-------| -------|
| visible  | boolean | 是否显示    |
| options  | object | 启动参数    |
| cancel  | function | 取消或关闭事件    |
| complete  | function | 审核完成事件    |

启动参数:options
```
{
    taskId: 任务id,
    procDefId:流程定义id,
    nodeId: 节点id
}
```

通过事件:complete
```
{
    error: 0 | 1, 0为没有错误, 1为错误
    message: 错误消息
}
```

vue
```jsx
<workflow-approve 
    :visible="visible"
    :options="options"
    @cancel="cancel"
    @complete="complete" />
```

jsx示例
```jsx
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
```

## 驳回

| key  | 类型 |　说明 |
| ------|-------| -------|
| visible  | boolean | 是否显示    |
| options  | object | 启动参数    |
| cancel  | function | 取消或关闭事件    |
| complete  | function | 审核完成事件    |

启动参数:options
```
{
    procDefId: 流程定义id,
    procInstId: 流程实例id,
    nodeId: 节点id
}
```

通过事件:complete
```
{
    error: 0 | 1, 0为没有错误, 1为错误
    message: 错误消息
}
```

vue
```jsx
<workflow-reject 
    :visible="visible"
    :options="options"
    @cancel="cancel"
    @complete="complete" />
```

jsx示例
```jsx
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
```
## 流程跟踪

| key  | 类型 |　说明 |
| ------|-------| -------|
| visible  | boolean | 是否显示    |
| options  | object | 启动参数    |
| cancel  | function | 取消或关闭事件    |
| complete  | function | 审核完成事件    |

启动参数:options
```
{
    procInstId:流程实例id,
}
```

显示方向:direction
```
horizontal | vertical
```

vue
```jsx
<workflow-flow :direction="horizontal" :options="options" />
```

jsx示例
```jsx
<workflow-flow direction="horizontal" options={this.options} />
```




