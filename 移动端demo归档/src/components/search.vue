<template>
<div class="container topscroll" >
 <div class="header">
    假期查询
    <a class="goback" @click="goback()"></a>
  </div>
    <div class="searchBar">
      <input placeholder="请输入要查询的员工姓名/员工号/部门" v-model="searchContext">
      <div class="searchBtn" @click="search"></div>
    </div>
  <!-- <div class="filter">
    <div class="childFilter">
      <div @click="toggleStatus()" v-bind:class="[isStatus ? redClass : '']">{{optionList1[stateText]}}
        <div class="smallArr"  v-bind:class="[isStatus ? arrowRotate : '']"></div>
      </div>
    </div>
    <div class="childFilter">
      <div @click="toggleDate()"  v-bind:class="[isDate ? redClass : '']">{{optionList2[dateText]}}
        <div class="smallArr"  v-bind:class="[isDate ? arrowRotate : '']"></div>
      </div>
    </div>
  </div>
  <div class="filterCon" v-show="isStatus" @click="filterConClose()">
    <ul class="optionList optionList1"  v-bind:class="[isStatus ? optionListOpen : '']">
        <li v-for="(item,index) in optionList1" :key="index" @click="selectStatus(index)"  v-bind:class="[selectStatusIndex==index ? redClass : '']">
          <div class="listCon">
            {{item}}
            <div class="iconCurrect" v-show="selectStatusIndex==index"></div>
          </div>
        </li>
      </ul>
      <ul class="optionList optionList2" v-show="isDate"  v-bind:class="[isDate ? optionListOpen : '']">
        <li v-for="(item,index) in optionList2" :key="index" @click="selectDate(index)" v-bind:class="[selectStatusIndex==index ? redClass : '']">
          <div class="listCon" >
            {{item}}
            <div class="iconCurrect" v-show="selectStatusIndex==index"></div>
          </div>
        </li>
      </ul>
  </div>
    <div class="filterCon" v-show="isDate"  @click="filterConClose()">
      <ul class="optionList optionList2"   v-bind:class="[isDate ? optionListOpen : '']">
        <li v-for="(item,index) in optionList2" :key="index" @click="selectDate(index)" v-bind:class="[selectDateIndex==index ? redClass : '']">
          <div class="listCon" >
            {{item}}
            <div class="iconCurrect" v-show="selectDateIndex==index"></div>
          </div>
        </li>
      </ul>
  </div> -->
  <mt-loadmore
    :auto-fill="false"
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomDistance=50
    ref="loadmore"
   >
    <ul class="applyList">
      <li v-for="(item,index) in listdata" :key="index">
        <div class="applyLeft">
          <div class="applyTitle">
            <div class="applyIcon">{{getFirstWorld(item.leavetype)}}</div>
            <div class="applyTitleText">{{item.leavetype}}申请</div>
          </div>
          <div class="applyTime">
           {{item.begindate}} - {{item.enddate}}
            <span></span>
          </div>
          <div class="applyText">
            {{item.leavedes}}
          </div>
        </div>
        <div class="applyStatus">{{getProcessName(item.approveresult)}}</div>
        <div class="applyProgress" @click="applyprocess(item.pk_leave)">查看详情</div>
        <div class="clear"></div>
      </li>
    </ul>
    <div class="no-more" v-if="nodata">没有更多了</div>
  </mt-loadmore>
 <!-- <div class="btnCon">
    <div class="applyBtn" id="applyBtn" @click="selectVacationKind()">
    我要休假
    </div>
    <div class="applyBtn" id="applyBtn1" >
      
   </div>
 </div> -->
<div class="container1"></div>
</div>
</template>
<script>
// import "../styles/vacationlist.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
//jsbridge======================================
var setupWebViewJavascriptBridge = function(callback) {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement("iframe");
    WVJBIframe.style.display = "none";
    WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  } else if (/(Android)/i.test(navigator.userAgent)) {
    // 这是Android
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function() {
          callback(WebViewJavascriptBridge);
        },
        false
      );
    }
  } else {
    //PC
  }
};
//jsbridge======================================
export default {
  name: "search",
  data() {
    return {
      stateText:0,
      dateText:0,
      optionList1: ["全部状态","审批中", "已审批"],
      optionList2: ["全部期间", "一月内", "三月内", "半年内"],
      isStatus: false,
      isDate: false,
      redClass: "redClass",
      arrowRotate: "arrowRotate",
      optionListOpen: "optionListOpen",
      selectStatusIndex: 100,
      selectDateIndex: 100,
      pickArr: [{ id: "10001", value: "休假申请" },{ id: "10002", value: "哺乳假申请" }],
      allLoaded: false,
      page: 1,
      topStatus:'',
      listdata:[],
      usercode:"shizj",
      nodata:false,
      searchContext:""
    };
  },
  methods: {
      search:function(){
       var _this = this;
      var data = {};
      data.searchContext = this.searchContext;
      data.usercode = this.usercode;
      data.pagenum = 1;
      data.transtype = "getappleave";
      data.opflag = '';
      data.submittime='全部期间';
        this.getData(data)
      },
    filterConClose:function(){    
      this.isStatus = false;
      this.isDate = false;
    },
    getProcessName:function(res){    //判断审批状态
      if(res==""){
        return "审批中"
      }else if(res=="Y"){
        return "已通过"
      }else if(res=="N"){
        return "已通过"
      }
    },
    getFirstWorld:function(res){//截取首个文字
      return res.slice(0,1)
    },
    toggleStatus: function() {
      this.isStatus = !this.isStatus;
      this.isDate = false;
    },
    toggleDate: function() {
      this.isDate = !this.isDate;
      this.isStatus = false;
    },
    selectStatus: function(ev) {
      this.selectStatusIndex = ev;
      this.isStatus = false;
      this.stateText = ev;
      this.loadTop();
    },
    selectDate: function(ev) {
      this.selectDateIndex = ev;
      this.isDate = false;
      this.dateText = ev;
      this.loadTop();
    },
    selectVacationKind: function() {
      var _this = this;
      var showBankDom = document.querySelector("#applyBtn");
      var bankIdDom = document.querySelector("#applyBtn1");
      var bankId = showBankDom.dataset["id"];
      //   var bankName = showBankDom.dataset['value'];
      var bankSelect = new IosSelect(1, [this.pickArr], {
        container: ".container1",
        title: "休假类型",
        itemHeight: 50,
        itemShowCount: 3,
        oneLevelId: bankId,
        callback: function(selectOneObj) {
          console.log(selectOneObj);
          bankIdDom.value = selectOneObj.id;
          showBankDom.innerHTML = selectOneObj.value;
          showBankDom.dataset['id'] = selectOneObj.id;
          showBankDom.dataset['value'] = selectOneObj.value;
          _this.$router.push({name:'vacationapply'});
        
        }
      });
    },
    goback:function(){
      this.$router.push({name: 'vacationIndex', params: {}})
    },
    loadTop:function(){   //下拉刷新
      //this.handleTopChange()
      var _this = this;
      var data = {};
      data.usercode = this.usercode;
      data.pagenum = 1;
      data.transtype = "getappleave";
      data.status = '';
      data.submittime='';
      if(this.selectStatusIndex==100||this.selectStatusIndex==0){
        data.status="全部状态"
      }else if(this.selectStatusIndex==1){
        data.status="审批中"
      }else if(this.selectStatusIndex==2){
        data.status="已审批"
      }else{
        data.status="全部状态"
      }
      if(this.selectDateIndex==100||this.selectDateIndex==0){
        data.submittime="全部期间"
      }else if(this.selectDateIndex==1){
        data.submittime="一月内"
      }else if(this.selectDateIndex==2){
        data.submittime="三月内"
      }else if(this.selectDateIndex==3){
        data.submittime="半年内"
      }else{
        data.submittime="全部期间"
      }
      this.getData(data)
    },
    handleTopChange:function(status){
      //this.topStatus = status;
    },
    loadBottom:function(){

      this.page++;
      var _this = this;
      var data = {};
      data.usercode = this.usercode;
      data.pagenum = this.page;
      data.transtype = "getappleave";
      data.searchContext = this.searchContext;
      data.status = '';
      data.submittime='全部期间';
      if(this.selectStatusIndex==100||this.selectStatusIndex==0){
        data.status="全部状态"
      }else if(this.selectStatusIndex==1){
        data.status="审批中"
      }else if(this.selectStatusIndex==2){
        data.status="已审批"
      }else{
        data.status="全部状态"
      }
      if(this.selectDateIndex==100||this.selectDateIndex==0){
        data.submittime="全部期间"
      }else if(this.selectDateIndex==1){
        data.submittime="一月内"
      }else if(this.selectDateIndex==2){
        data.submittime="三月内"
      }else if(this.selectDateIndex==3){
        data.submittime="半年内"
      }else{
        data.submittime="全部期间"
      }
      this.loadMore(data)
    },
    getData:function(res){
      // Indicator.open('加载中');
      let serverUrl = process.env.API_HOST
      let _this = this;
      _this.listdata = [];
      _this.allLoaded = false;
      _this.nodata = false;
      _this.page = 1;
      axios.get(serverUrl+"leave/appleavelist",{params:res}).then(function(res){
        _this.$refs.loadmore.onTopLoaded();
        if(res.data.result.retflag==0){
          _this.listdata = res.data.result.data;
          console.log(_this.listdata)
        }
      },function(){
        setTimeout(function(){
          _this.$refs.loadmore.onTopLoaded();
        },15000)
      })
    },
    loadMore:function(res){
      let serverUrl = process.env.API_HOST
      let _this = this;
      axios.get(serverUrl+"leave/appleavelist",{params:res}).then(function(res){
        _this.$refs.loadmore.onBottomLoaded();
        if(res.data.result.retflag==0){
          _this.listdata = _this.listdata.concat(res.data.result.data);
          if(res.data.result.data.length==0){
            //没有新数据了
            _this.allLoaded = true;
            _this.nodata = true;
            _this.$refs.loadmore.onBottomLoaded();
          }
          console.log(_this.listdata)
        }
      },function(){
        setTimeout(function(){
          _this.$refs.loadmore.onTopLoaded();
        },15000)
      })
    },
    applyprocess:function(res){
      var _this = this;
      this.$router.push({name: 'applyprocess', params: {usercode:_this.usercode,pk_leave:res,fatherPage:"search"}})
    }
  },
  created: function() {},
  mounted:function(){
    this.usercode = this.$route.params.usercode;
  }
};
</script>
<style scoped lang="scss">
  .topscroll{
    height:calc(100vh - 45px) !important;
    // overflow: auto;
    // -webkit-overflow-scrolling: touch;
    height:100vh;
    overflow:auto;
  }
  .container{
    margin-top:45px;
  }
  .no-more{
    text-align: center;
    font-size:12px;
    height:30px;
    line-height:30px;
  }
  body{
    background:#e4e4e4;
    box-sizing: border-box;
    padding-bottom: 90px;
    padding-top: 90px;
  }
  .header{
    height:44px;
    width:100%;
    background:#fff;
    font-size: 17px;
    text-align: center;
    line-height: 44px;
    position: relative;
    border-bottom:1px solid #EDEDED;
    position: fixed;
    top:0;left:0;
    z-index:2;
  }
  .goback{
    width:30px;
    height:44px;
    display: block;
    position: absolute;
    left:0;top:0;
    background:url('../assets/Shape@2x.png') no-repeat center;
    background-size:8px 16px;
  }
  .filter{
    width:100%;
    height:44px;
    line-height: 44px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #EDEDED;
    background:#fff;
    position: fixed;
    top:45px;
    left:0;
    z-index:2;
  }
  .childFilter{
    flex:1;
    text-align: center;
    font-size: 15px;
  }
  .optionList{
    width:100%;
    height:0;
    overflow: hidden;
    transition:all 5s;
    background:#fff;
  }
  .filterCon{
    position: fixed;
    top:90px;
    left:0;
    z-index:2;
  }
  .optionListOpen{
    height:auto;
  }
  .optionList li{
    width:100%;
    height:44px;
    font-size: 15px;
    color:#000;
    line-height: 44px;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .optionList li .listCon{
    border-bottom:1px solid #BCBBC1;
    position: relative;
  }
  .iconCurrect{
    position: absolute;
    width:44px;
    height:44px;
    right:0;
    top:0;
    background: url('../assets/Checkmark@2x.png') no-repeat center;
    background-size: 100%;
  }
  .redClass{
    color:#FC6251 !important; 
  }
  .smallArr{
    width: 0;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
    margin:0 0 -10px 10px;
    display: inline-block;
    margin-top: -10px;
    transform: translateY(-8px);
    -webkit-transform: translateY(-8px);
    transition:all 0.3s;
    transform-origin:50% 20%;
  }
  .arrowRotate{
    transform: translateY(-8px) rotate(180deg);
    -webkit-transform: translateY(-8px)  rotate(180deg);
     border-color: #FC6251 transparent transparent transparent;
  }
  .btnCon{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#e4e4e4;
    height:70px;
  }
  .applyBtn{
    width:343px;
    height:50px;
    background: #FB6251;
    border-radius: 8px;
    font-size: 18px;
    color:#fff;
    text-align: center;
    line-height: 50px;
    margin:10px auto;
  }
  .applyLeft{
    width:75%;
    float:left;
  }
  .applyRight{
    width:25%;
    float:left;
  }
  .applyList{
    /* padding-top:43px; */
  }
  .mint-loadmore{
    //padding-top:43px;
  }
  .applyList li{
    margin:10px 0;
    background:#fff;
    display: block;
    min-height: 102px;
    position: relative;
  }
  .clear{
    clear: both;
  }
  .applyIcon{
    width:25px;
    height:25px;
    float:left;
    border-radius: 4px;
    background:#FF9727;
    color:#fff;
    font-size: 16px;
    text-align: center;
    line-height: 25px;
    margin:0 5px 0 15px;
  }
  .applyTitleText{
    font-size: 17px;
    line-height: 25px;
  }
  .applyTitle{
    height:25px;
    margin:10px 0;
  }
  .applyTime{
    height:22px;
    line-height: 22px;
    font-size: 15px;
    box-sizing: border-box;
    padding-left:15px;
  }
  .applyTime span{
    font-size:12px;
  }
  .applyText{
    box-sizing: border-box;
    padding-left:15px;
    font-size: 15px;
    padding-top:5px;
    padding-bottom:10px;
  }
  .applyRight{
    /* height:100%; */
    width:25%;
  }
.applyRight1 img{
  width:76px;
  margin-top: 15px
}
.applyRight2{
  position: relative;
}
.applyStatus{
  position: absolute;
  top:10px;
  font-size:14px;
  color:#FF9727;
  right:15px;
}
.applyProgress{
  position: absolute;
  color:#00A6E8;
  width:60px;
  height:26px;
  text-align: center;
  line-height: 26px;
  font-size: 11px;
  border: 1px solid #00A6E8;
  border-radius: 4px;
  bottom:10px;
  right:15px;
}
.filterCon{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.3)
}
.container{
  //height:100%;
}
#app{
  height:100%;
}
.searchBar{
    width:100%;
    height:45px;
    background:#fff;
    input{
        height:100%;
        line-height:45px;
        border:none;
        font-size:14px;
        box-sizing:border-box;
        padding-left:5px;
        width:calc(100vw - 47px);
        float:left;
    }
    .searchBtn{
        width:45px;
        height:45px;
        display:inline-block;
        background:url('../assets/search_icon.png') no-repeat center;
        background-size:65%;
    }
}
</style>