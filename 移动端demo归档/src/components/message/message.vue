<template>
  <div class="container topscroll" >
     <public-header :title="'信息'"></public-header>
    <div class="msglist-con">
        <div class="msg-list" @click="jumpToChart(item.To_Account)" :uid="item.To_Account" v-for="(item,index) in listData" :key="index">
            <div class="header-con">
                <img :src="item.C2cImage">
            </div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">{{item.C2cNick}}</div>
                    <div class="msg">{{item.MsgShow}}</div>
                </div>
                <div class="main-right">
                    <div class="tip" v-show="item.UnreadMsgCount!=0">{{item.UnreadMsgCount}}</div>
                    <div class="tip" v-show="item.UnreadMsgCount==0" style="background:none;"></div>
                    <div class="time">{{format(item.MsgTimeStamp)}}</div>
                </div>
            </div>
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
  name: "message",
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
        listData:[]


    };
  },
  methods: {
      jumpToChart(uid){
           this.$router.push({name:"msg_detail", params: {uid:uid}})
      },
      format(tamp){
          tamp = 1000*tamp;
            function add0(m){return m<10?'0'+m:m }
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(tamp);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            //return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
            return add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm);
        },
      focus(){
            this.callService({
                hash:"/suiliao-api/suiliao/user/addFollow",
                params:{
                    uid:this.userInfo_mine.uid,
                    touid:this.userInfo.uid
                },
                success:(res)=>{
                console.log(res)
                if(res.err_code=="8888"){
                    this.isFocus = 1;
                    this.focusText = "已关注";
                }else{
                    Toast(res.err_msg)
                }
                },
                fail:function(){

                }   
            });  
      },
      getSelectData(res){
        this.leaveKind = res.selected;
      },
      getSelectData2(res){
        this.leaveAim = res.selected;
      },
      returnFun(){
        console.log(22)
      }
  },
  created: function() {

  },
  mounted:function(){
    let _this = this;
    //   腾讯im登陆
    let loginInfo = {};
    loginInfo.sdkAppID = "1400068060";
    loginInfo.appIDAt3rd = "1400068060";
    loginInfo.identifier = "8447633";
    loginInfo.identifierNick = "ly";
    loginInfo.userSig = "eJxFkF1PgzAUhv8LtxrXlraAyS6wuGTiovuIRm*aBg5LdUIpHYJm-13EEW*fJyfv*55vb3e-vVLG6FwqJ32be9ce8i5HDJ3RFqQqHNgBY8YYQWiyLdhGV*UgCMIMEx*hf6lzKJ0u9HgYUhpw3z*rRu8Htrpdi6VgmjagAKFWFQHMaqhTArTdPtbBDbiXNFoskg1perGOddxfJB3b4Ifd0cbPX-hQoOVhnz0JMUsTHPLVXecMq5JX8vY5n09h*bsc1-32p0M-HiI*lXT6A-52cYojRqMzV1lWHUsnXW9gfMfpBw*aVkI_";
    loginInfo.accountType = 1
    localStorage.setItem("loginInfo",JSON.stringify(loginInfo));

    let listeners = {
        "onConnNotify": onConnNotify//监听连接状态回调变化事件,必填
        ,"jsonpCallback": jsonpCallback//IE9(含)以下浏览器用到的 jsonp 回调函数，
        ,"onMsgNotify": onMsgNotify//监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        // ,"onBigGroupMsgNotify": onBigGroupMsgNotify//监听新消息(直播聊天室)事件，直播场景下必填
        // ,"onGroupSystemNotifys": onGroupSystemNotifys//监听（多终端同步）群系统消息事件，如果不需要监听，可不填
        // ,"onGroupInfoChangeNotify": onGroupInfoChangeNotify//监听群资料变化事件，选填
        // ,"onFriendSystemNotifys": onFriendSystemNotifys//监听好友系统通知事件，选填
        // ,"onProfileSystemNotifys": onProfileSystemNotifys//监听资料系统（自己或好友）通知事件，选填
        // ,"onKickedEventCall" : onKickedEventCall//被其他登录实例踢下线
         ,"onC2cEventNotifys": onC2cEventNotifys//监听 C2C 系统消息通道
    };
    var onConnNotify = function (resp) {
    var info;
    switch (resp.ErrorCode) {
        case webim.CONNECTION_STATUS.ON:
            webim.Log.warn('建立连接成功: ' + resp.ErrorInfo);
            break;
        case webim.CONNECTION_STATUS.OFF:
            info = '连接已断开，无法收到新消息，请检查下您的网络是否正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        case webim.CONNECTION_STATUS.RECONNECT:
            info = '连接状态恢复正常: ' + resp.ErrorInfo;
            alert(info);
            webim.Log.warn(info);
            break;
        default:
            webim.Log.error('未知连接状态: =' + resp.ErrorInfo);
            break;
        }
    };
    function jsonpCallback(rspData) {
    //设置 jsonp 返回的
        webim.setJsonpLastRspData(rspData);
    }
    //监听新消息事件
    var onC2cEventNotifys = {
      "92": onMsgReadedNotify, //消息已读通知,
      "96": ""
    };
    //消息已读通知
function onMsgReadedNotify(notify) {
    var sessMap = webim.MsgStore.sessMap()[webim.SESSION_TYPE.C2C + notify.From_Account];
    if (sessMap) {
        var msgs = _.clone(sessMap.msgs());
        var rm_msgs = _.remove(msgs, function (m) {
            return m.time <= notify.LastReadTime
        });
        var unread = sessMap.unread() - rm_msgs.length;
        unread = unread > 0 ? unread : 0;
        //更新sess的未读数
        sessMap.unread(unread);
        // console.debug('更新C2C未读数:',notify.From_Account,unread);
        //更新页面的未读数角标

        if (unread > 0) {
            $("#badgeDiv_" + notify.From_Account).text(unread).show();
        } else {
            $("#badgeDiv_" + notify.From_Account).val("").hide();
        }
    }
}
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
                console.log(newMsgList)
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
    let opts = {
        isAccessFormalEnv:true,
        isLogOn:false
    }   
    let cbOk = function(resp){
        loginInfo.identifierNick = resp.identifierNick;//设置当前用户昵称
        console.log(resp)
        console.log("im 登录成功")
        // webim.getC2CHistoryMsgs (options,cbOk, cbErr);
        //获取最近消息
        webim.getRecentContactList({'Count': 10},function(res){
            console.log(res)
            _this.listData = res.SessionItem;

        },function(err){
            Toast(err);
        });
    }
    let cbErr = function(err){
        alert(err.ErrorInfo);
    }

        webim.login(loginInfo, listeners,opts,cbOk,cbErr);

    // setTimeout(function(){
    //     window.selToID = "8278585"; //聊天对象id
    //     window.msgContent = "这是一条测试新消息1122344";
    //     window.selType = webim.SESSION_TYPE.C2C;
    //     onSendMsg();
    // },2000)

      $(".goback-btn").hide();
      $(".corner-fun").hide();
      $(".footer").show();
      this.userInfo_mine = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo_mine)
       this.uid = this.$route.params.uid;
       this.callService({
        hash:"/suiliao-api/suiliao/user/getUserInfo",
        params:{
          uid:this.uid,
          channel:"suiliao"
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
             
               
          }else{
           
          }
        },
        fail:function(){

        }
      }); 
    //   是否关注 	/suiliao-api/suiliao/user/checkFollow

   
  }
};

</script>
<style scoped lang="scss"> 
    .container{
        margin-top:45px;
        margin-bottom:45px;
    }
    .msg-list{
        height:60px;
        display: flex;
        .header-con{
            width:60px;
            height:60px;
            
            img{
                width:80%;
                height:80%;
                border-radius: 50%;
                margin:6px 0 0 8px;
                
            }
            overflow: hidden;
            
            box-sizing: border-box;
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
                    padding:10px 0 6px 10px;
                }
                .msg{
                    color:rgb(144,144,144);
                    font-size:14px;
                    height:14px;
                    padding-left:10px;
                }
            }
            .main-right{
                width:95px;
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



