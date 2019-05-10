<template>
  <div class="container topscroll" >
     <public-header :title="'聊天'"></public-header>
    <div class="msglist-con">
      <div class="tip-bar">官方提醒:加微信、裸聊、看视频都是欺诈行为，请勿轻信，请勿转账</div>
    </div>
    <div class="chart-con">
      <div class="pop">
        <div class="sigle-bar" v-for="(item,index) in chartList" :key="index">
          <img class="head-img" :src="item.head_src">
          <div class="con">
            <div class="con-text">{{item.context}}</div>
          </div>
        </div>
      </div>
      <div class="fun">
        <div class="yy"></div>
        <input class="text" v-model="chartContain">
        <div class="moji"></div>
        <div class="more" v-show="!isInputing"></div>
        <div class="fasong" @click="sendMsg" v-show="isInputing">发送</div>
      </div>
    </div>
  </div>
</template>
<script>
// import "../styles/vacationlist.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
import PublicHeader from '@/components/public_components/header'
export default {
  name: "msg_detail",
  components:{PublicHeader},
  data() {
    return {
        userInfo:{},
        accountInfo:{},
        levelInfo:{},
        uid:"",
        footer:false,
        userInfo_mine:{},
        isFocus:0,
        focusText:"关注",
        maleIcon:"maleIcon",
        femaleIcon:"femaleIcon",
        chartContain:"",
        isInputing:false,
        chartList:[   //聊天消息主要数据，用于展示
          // {
          //   self:1,      //self:0 对方发送的消息  self:1 自己发送的消息，
          //   head_src:"", //头像
          //   context:"",  //发送的内容
          // }
        ],
    };
  },
  watch:{
    chartContain(val){
      if(val!=""){
        this.isInputing = true;
      }else{
        this.isInputing = false;
      }
    }
  },
  methods: {
    sendMsg(){
      let _this = this;
      window.selToID = this.uid; //聊天对象id
      window.msgContent = this.chartContain;
      window.selType = webim.SESSION_TYPE.C2C;
      onSendMsg(function(res){
        console.log(res)
        if(res.ErrorCode==0){
          _this.chartList.push({
            self:1,
            head_src:"",
            context:_this.chartContain
          })
        }
      });

    }
  },
  created: function() {
  
  },
  mounted:function(){
    this.uid = this.$route.params.uid;
    console.log(this.uid)
    //监听新消息事件
    //newMsgList 为新消息数组，结构为[Msg]
    function onMsgNotify(newMsgList) {
        //console.warn(newMsgList);
        var sess, newMsg;
        //获取所有聊天会话
        var sessMap = webim.MsgStore.sessMap();
        for (var j in newMsgList) {//遍历新消息
            newMsg = newMsgList[j];
            if (newMsg.getSession().id() == selToID) {//为当前聊天对象的消息
                selSess = newMsg.getSession();
                //在聊天窗体中新增一条消息
                //console.warn(newMsg);
                addMsg(newMsg);
            }
        }
        //消息已读上报，以及设置会话自动已读标记
        webim.setAutoRead(selSess, true, true);
        for (var i in sessMap) {
            sess = sessMap[i];
            if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
                updateSessDiv(sess.type(), sess.id(), sess.unread());
            }
        }
    }
      this.userInfo_mine = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo_mine);
       this.uid = this.$route.params.uid;

    

  $(".footer").hide();
  }
};

</script>
<style scoped lang="scss"> 
.con{
  flex:1;
  .con-text{
    width:80%;
    background:lightblue;
    padding:3px 5px;
    border-radius: 5px;
  }
}
.sigle-bar{
  display: flex;
  min-height:50px;
  margin: 10px 0;
}
.head-img{
  width:50px;
  height:50px;
  display: block;
  margin-right:10px;
  margin-left:10px;
  border-radius:50%;
}
.chart-con{
  width:100%;
  display: flex;
  height:calc(100vh - 45px - 20px);
  flex-direction: column;
  .pop{
    flex:1;
    overflow: scroll;
  }
  .fun{
    height:50px;
    display: flex;
    border-top:1px solid #f0f0f0;
    box-sizing: border-box;
    .yy{
      width:30px;
      background: url("../../assets/suiliao/icon_yy.png") no-repeat center;
      background-size:88%;
      margin:0 8px 0 10px;
    }
    .text{
      flex:1;
      background:#fafafa;
      border:none;
      outline:none;
      height:30px;
      border-radius: 5px;
      padding-left:5px;
      box-sizing:border-box;
      margin-top:10px;
      font-size:14px;
    }
    .moji{
      width:30px;
      background: url("../../assets/suiliao/icon_moji.png") no-repeat center;
      background-size:88%;
      margin:0 5px 0 8px;
    }
    .more{
      width:30px;
      background: url("../../assets/suiliao/icon_more.png") no-repeat center;
      background-size:88%;
      margin-right:12px;
    }
    .fasong{
      width:30px;
      background:#FF8687;
      color:#fff;
      margin-right:12px;
      font-size:10px;
      height:25px;
      line-height:25px;
      text-align: center;
      border-radius: 5px;
      margin-top:10px;
    }
  }
}
@keyframes tipframe {    
  0% {
    margin-left:100vw;
  }    
  100% {
    margin-left:-100vw;
  }     
  }
 
  .tip-bar{
    height:20px;
    line-height: 20px;
    color:#fff;
    background:#FF8687;
    padding:0 5px;
    font-size: 10px;
    animation:tipframe 20s infinite linear;
  }
    .container{
        margin-top:45px;
        overflow: hidden;
    }
    .msg-list{
        height:60px;
        display: flex;
        .header-con{
            width:60px;
            height:60px;
        }
        .main-con{
            flex:1;
            display: flex;
            border-bottom:1px solid #e1e1e1;
            .main-left{
                flex:1;
                .name{
                    color:#333;
                    font-size:17px;
                    height:17px;
                    padding:10px 0 6px 0;
                }
                .msg{
                    color:rgb(144,144,144);
                    font-size:14px;
                    height:14px;
                }
            }
            .main-right{
                width:60px;
                height:60px;
                .tip{
                    color:#fff;
                    width:12px;
                    height:12px;
                    font-size:12px;
                    text-align: center;
                    line-height:12px;
                    background:red;
                    border-radius:50%;
                    margin:12px auto 6px auto;
                }
                .time{
                    color:rgb(144,144,144);
                    font-size:14px;
                    height:14px;
                    text-align:center;
                }
            }
        }
    }
</style>



