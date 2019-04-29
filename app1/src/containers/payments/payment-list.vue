<template>
  <div>
    <div>
      <a-row>
        <a-col :span="8">
          <a-dropdown-button @click="handleButtonClick" type="primary">
            填写申请
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"><router-link to="/payment/create">经费报销单</router-link></a-menu-item>
            </a-menu>
          </a-dropdown-button>
        </a-col>
        <a-col>
          <a-button-group>
            <a-button :type="savedStyle" @click="switchStatus(1)">已保存</a-button>
            <a-button :type="finishStyle" @click="switchStatus(3)">已完成</a-button>
            <a-button :type="submitedStyle" @click="switchStatus(2)">审核中</a-button>
          </a-button-group>
        </a-col>
      </a-row>
    </div>
    <div class="payment-list">
      <a-table 
      :columns="columns" 
      :dataSource="payments.rows"
      :pagination="pagination"
      :locale="locale"
      >
        <span slot="index" slot-scope="text, record, index">{{index + 1}}</span>
        <span slot="type" slot-scope="text, record">{{ rednerType(record) }}</span>
        <span slot="date" slot-scope="text, record">{{ rednerDate(record) }}</span>
        <span slot="action" slot-scope="text, record">
          <a href="javascript:;" @click="edit(record)">编辑</a>
          <a-divider type="vertical"/>
          <a href="javascript:;" @click="del(record)">删除</a>
        </span>
      </a-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action, State } from "vuex-class";
import moment from "moment";
enum QueryState {
  saved = 1,
  sumitted = 2,
  finished = 3
}
const req = {
  pageSize: 10,
  pageNum: 1,
  deptName: "",
  sumFrom: 0,
  sumTo: 2000000,
  type: "",
  dateFrom: "",
  dateTo: "",
  status: QueryState.saved
};

const columns = [
  {
    title: "序号",
    dataIndex: "id",
    key: "id",
    // slots: { title: '序号' },
    scopedSlots: { customRender: "index" }
  },
  {
    title: "单据类型",
    dataIndex: "type",
    key: "type",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "部门名称",
    dataIndex: "deptName",
    key: "deptName"
  },
  {
    title: "报销日期",
    dataIndex: "date",
    key: "date",
    scopedSlots: { customRender: "date" }
  },
  {
    title: "报销事由",
    dataIndex: "reason",
    key: "reason"
  },
  {
    title: "单据金额",
    dataIndex: "sum",
    key: "sum"
  },
  {
    title: "单据状态",
    dataIndex: "state",
    key: "state"
  },
  {
    title: "报销人",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

@Component
export default class PaymentList extends Vue {
  columns: any = columns;
  data: any;

  status: QueryState = QueryState.saved;

  get locale() {
    return  { emptyText: '当前没有数据'};
  }
  get pagination() {
     return {
        total: this.payments.total,
        pageSize: req.pageSize,
        current: req.pageNum
     }
  }

  @Action getPaymentList: any;
  @Action deletePayment: any;
  @State payments: any;

  get savedStyle(){
      console.log('savedStyle', this.status, req.status);
      return this.status == QueryState.saved ? 'primary' : 'default';
  }

  get submitedStyle(){
    return this.status == QueryState.sumitted ? 'primary' : 'default';
  }

  get finishStyle(){
    return this.status == QueryState.finished ? 'primary' : 'default';
  }

  created() {
    this.status = QueryState.saved;
  }
  mounted() {
    
    console.log('mounted', this.status);
    this.getPaymentList({ ...req, status: this.status });
    //this.status = req.status;
  }
  handleButtonClick(e: any) {
    console.log("click left button", e);
  }
  handleMenuClick(e: any) {
    console.log("click", e);
  }
  rednerType(record: any) {
    let content = "";
    if (record.type == 1) {
      content = "经费报销单";
    } else if (record.type == 2) {
      content = "差旅报销单";
    }
    return content;
  }

  isPrimary(status: QueryState) {
      if(this.status == status){
        return 'primary';
      }
      return 'default';
  }

  switchStatus (status: QueryState) {
    console.log('switchStatus', status);
       this.status = status;
      try
      {
        this.getPaymentList({ ...req, status: this.status });
      }catch(e) {

      }
  }

  rednerDate(record: any) {
    return moment(record.date * 1000).format("YYYY-MM-DD");
  }

  edit(record: any) {
    console.log("record", record);
    this.$router.push('/payment/edit/' + record.id + 
    "?processId=" + (record.processId || '') + 
    "&taskId=" + record.taskId + 
    "&procDefId=" + (record.procDefId || '') + 
    "&nodeId=" + (record.nodeId|| '') + 
    "&status=" + this.status
    //"&appCode=" + (record.appCode||'')
    );
  }

  async del(record: any) {
    console.log("record", record);
      await this.deletePayment({ id: record.id });
      req.pageNum = 1;
      this.getPaymentList({ ...req, status: this.status });
  }
}
</script>

