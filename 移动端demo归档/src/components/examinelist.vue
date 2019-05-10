<template>
<div class="container topscroll" >
 <div class="header">
    <div class="heaer-text">审批列表1</div>
    <a class="goback" @click="goback()"></a>
      <div class="selectAllCon" @click="toggleSelectAll()">
        <div class="selectAll" v-bind:class="[isSelectAll===true ? selected : '']"></div>全选</div>
  </div>
  
   <div class="filter">
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
  </div>
  
  <mt-loadmore
    :auto-fill="false"
    :top-method="loadTop"
    :bottom-method="loadBottom"
    :bottom-all-loaded="allLoaded"
    :bottomDistance=50
    ref="loadmore">
    <ul class="applyList">
      <li @click="toggleLi(index)" v-for="(item,index) in listData" :key="index" :a="item.isSelected" v-bind:class="[item.isSelected==true ? corner : '']">
        <div class="applyLeft">
          <div class="applyTitle">
            <div class="applyIcon">事</div>
            <div class="applyTitleText">{{item.leavetype}}申请</div>
          </div>
          <div class="applyTime">
            {{item.begindate}}- {{item.enddate}}
            <span>{{item.days}}天</span>
          </div>
         
          <div class="applyText">
            {{item.leavedes}}
          </div>
           <div class="applyTime">
            提交日期:{{item.subtime}}
          </div>
        </div>
        <div class="applyStatus" >{{item.username}} , {{item.deptname}}</div>
        <div class="applyProgress" @click="lookDetail(item.pk_leave)">查看详情</div>
        <div class="clear"></div>
      </li>
    </ul>
    <div class="no-more" v-if="nodata">没有更多了</div>
  </mt-loadmore>
    



 <div class="btnCon">
  
    <div class="examineBtnCon">
      <div class="refuse examBtn" @click="resuseFun()">拒绝</div>
      <div class="agree examBtn" @click="agreeFun()">通过</div>
    </div>
 </div>
<div class="container1"></div>

</div>
 
  
</template>

<script>


// import "../styles/search.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
export default {
  name: "search",
  data() {
    return {
      isSelectAll:false,
      allLoaded: false,
      page: 1,
      selected:'selected',
      corner:'corner',
      stateText:0,
      dateText:0,
      optionList1: ["未审批","已审批",],
      optionList2: ["全部期间", "一月内", "三月内", "半年内"],
      isStatus: false,
      isDate: false,
      redClass: "redClass",
      arrowRotate: "arrowRotate",
      optionListOpen: "optionListOpen",
      selectStatusIndex: 100,
      selectDateIndex: 100,
      usercode:"shizj",
      //  usercode:"songss",
      // usercode:"jiangff3",
      listData:[],
      nodata:false,
      topStatus:'',
    };
  },
  methods: {
     filterConClose:function(){    
      this.isStatus = false;
      this.isDate = false;
    },
    agreeFun:function(){
        let _this = this;
        var len = this.listData.length;
        var pk_leave = "";
        var count = 0;//计数器
        for(var i=0;i<len;i++){
          if(this.listData[i].isSelected === true){
           count++
          }
        }
        if(count>10){
          Toast('每次最多选择10条');
          return false;
        }
        for(var i=0;i<len;i++){
          if(this.listData[i].isSelected === true){
            pk_leave+=this.listData[i].pk_leave+"&"
            this.listData.splice(i,1);
            i--;
            len--
          }
        }
       
        console.log(pk_leave)
         //----------------同意
      let serverUrl = process.env.API_HOST
      var data = {};
      data.transtype = "approveleave";
      data.usercode = this.usercode;
      data.pk_leave = pk_leave;
      data.result = "Y";
       axios.get(serverUrl+"leave/approve",{params:data}).then(function(res){
        console.log(res)
        if(res.data.result.retflag==0){
          if(_this.listData.length==0){ //如果没数据了
              console.log(_this.listData.length)
              let data = {};
              data.usercode = _this.usercode;
              data.pagenum = "1";
              data.transtype = 'getappleave';
              data.opflag = "0",
              data.submittime = "全部期间";
              _this.getData(data);            
          }
           Toast('已同意');
        }else{
          Toast('请重试');
        }
      },function(){
      })
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
      console.log(this.selectStatusIndex);
      this.loadTop();
    },
    selectDate: function(ev) {
      this.selectDateIndex = ev;
      this.isDate = false;
      this.dateText = ev;
      this.loadTop();
    },
    resuseFun:function(){
      // 传给后台拒绝的数据
      var len = this.listData.length;
      var pk_leave = "";
      var count = 0;//计数器
      for(var i=0;i<len;i++){
        if(this.listData[i].isSelected === true){
          count++
        }
      }
      if(count>10){
        Toast('每次最多选择10条');
        return false;
      }
      for(var i=0;i<len;i++){
        if(this.listData[i].isSelected === true){
          pk_leave+=this.listData[i].pk_leave+"&"
          this.listData.splice(i,1);
          i--;
          len--
        }
      }
      //----------------拒绝
      let serverUrl = process.env.API_HOST
      var data = {};
      data.transtype = "approveleave";
      data.usercode = this.usercode;
      data.pk_leave = pk_leave;
      data.result = "N";
       axios.get(serverUrl+"leave/approve",{params:data}).then(function(res){
        console.log(res)
        if(res.data.result.retflag==0){
           Toast('已驳回');
        }
      },function(){
      })

    },
    toggleSelectAll:function(){
      var len = this.listData.length
      if(this.isSelectAll == false){
        for(var i=0;i<len;i++){
            this.listData[i].isSelected = true
        }
      }else{
        for(var i=0;i<len;i++){
            this.listData[i].isSelected = false
        }
      }
      this.isSelectAll = !this.isSelectAll;
    },
    toggleLi:function(index){
      this.$forceUpdate();
      this.listData[index].isSelected = !this.listData[index].isSelected;
      this.isSelectAll = false;
    },
    goback:function(){
      this.$router.push({name: 'vacationIndex', params: {}})
    },
    loadTop:function(){
         //this.handleTopChange()
      var _this = this;
      var data = {};
      data.usercode = this.usercode;
      data.pagenum = 1;
      data.transtype = "getappleave";
      data.opflag = '';
      data.submittime='';
      if(this.selectStatusIndex==100||this.selectStatusIndex==0){
        data.opflag="0"
      }else if(this.selectStatusIndex==1){
        data.opflag="1"
      }else{
        data.opflag="0"
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
    loadBottom:function(){
      this.page++;
      var _this = this;
      var data = {};
      data.usercode = this.usercode;
      data.pagenum = this.page;
      data.transtype = "getappleave";
      data.opflag = '';
      data.submittime='';
      if(this.selectStatusIndex==100||this.selectStatusIndex==0){
        data.opflag="0"
      }else if(this.selectStatusIndex==1){
        data.opflag="1"
      }else{
        data.opflag="0"
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
      var len = this.listData.length
      for(var i=0;i<len;i++){
        this.listData[i].isSelected = false;
      }
      this.isSelectAll = false;
      let serverUrl = process.env.API_HOST
      let _this = this;
      _this.listData = [];
      _this.allLoaded = false;
      _this.nodata = false;
      _this.listData = [];
      axios.get(serverUrl+"leave/appleavelist",{params:res}).then(function(res){
        console.log(res)
        _this.$refs.loadmore.onTopLoaded();
        if(res.data.result.retflag==0){
          _this.page = 1;
          _this.listData = res.data.result.data;
          for(var i=0;i<_this.listData.length;i++){
            _this.listData[i].isSelected = false;
          }
          console.log(_this.listData)
        }
      },function(){
        setTimeout(function(){
          _this.$refs.loadmore.onTopLoaded();
        },15000)
      })
    },
    loadMore:function(res){
      // var len = this.listData.length
      // for(var i=0;i<len;i++){
      //   this.listData[i].isSelected = false;
      // }
      this.isSelectAll = false;
      let serverUrl = process.env.API_HOST
      let _this = this;
      axios.get(serverUrl+"leave/appleavelist",{params:res}).then(function(res){
        _this.$refs.loadmore.onBottomLoaded();
        if(res.data.result.retflag==0){
          _this.listData = _this.listData.concat(res.data.result.data);
          console.log(_this.listData)
          if(res.data.result.data.length==0){
            //没有新数据了
            _this.allLoaded = true;
            _this.nodata = true;
            _this.$refs.loadmore.onBottomLoaded();
          }
        }
      },function(){
        setTimeout(function(){
          _this.$refs.loadmore.onTopLoaded();
        },15000)
      })
    },
    lookDetail:function(res){
      let _this = this;
      this.$router.push({name: 'applyprocess', params:{usercode:_this.usercode,pk_leave:res,fatherPage:"examinelist"}})
    }
  },
  created: function() {},
  mounted:function(){
    this.usercode = this.$route.params.usercode;
    let data = {};
    data.usercode = this.usercode;
    data.pagenum = "1";
    data.transtype = 'getappleave';
    data.opflag = "0",
    data.submittime = "全部期间";
    this.getData(data);

  }
};

</script>
<style scoped lang="scss">
.no-more{
  text-align: center;
  font-size:12px;
  height:30px;
  line-height:30px;
}
.applyProgress{
    position: absolute;
    color: #00A6E8;
    width: 60px;
    height: 26px;
    text-align: center;
    line-height: 26px;
    font-size: 11px;
    border: 1px solid #00A6E8;
    border-radius: 4px;
    bottom: 10px;
    right: 15px;
}
.mint-loadmore{
    padding-top: 43px;
    margin-bottom:43px;
}
.topscroll{
  height:calc(100vh - 45px) !important;
  /* // overflow: auto;
  // -webkit-overflow-scrolling: touch; */
  height:100vh;
  overflow:auto;
}
.selectAllCon{
  line-height: 40px;
  float:right;
  margin-right:5px;
}
.selectAll{
  width:25px;
  height:25px;
  background:url('../assets/icon_select.png') no-repeat center;
  background-size: 70%;
  float:left;
  margin:8px 0 0 0;
  
}
.selectAllCon .selected{
  background:url('../assets/icon_selected.png') no-repeat center;
  background-size:70%;
}

.applyList .corner{
  background:url('../assets/icon_rightCorner.png') no-repeat,#fff;
  background-position: top right ;
  background-size: 23px;
}
.examineBtnCon{
  height:100%;
}
.examineBtnCon .examBtn{
  width:48%;
  height:100%;
  line-height: 40px;
  color:#fff;
  text-align: center;
  border-radius: 5px;
}
.refuse{
  background:#f72828;
  float:left;
}
.agree{
  background: #19c519;
  float:right;
}
  .container{
    margin-top:45px;
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
    height:40px;

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
    max-height:47px;
    overflow:hidden;
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
  top:13px;
  font-size:14px;
  color:#FF9727;
  right:10px;
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
  height:100%;
}
#app{
  height:100%;
}
.lookDetail{
  position:absolute;
  right:5px;
  bottom:4px;
  color:#00A6E8;
  padding:5px 8px;
}
.heaer-text{
  position: absolute;
  left:0;top:0;
  z-index: -1;
  width:100%;
  text-align: center;
}

</style>



