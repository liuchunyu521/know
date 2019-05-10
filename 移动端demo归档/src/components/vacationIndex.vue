<template>
<div class="container">
 <div class="header">
    休假申请
    <a class="goback" @click="goback"></a>
  </div>
  <div class="nav">
    <div class="mine-block single-block">
      <div @click="navToApply()">
        <img src="../assets/icon_mine.png">
        <div class="mine-text">我要休假</div>
      </div>
    </div>
    <div class="mine-block single-block">
      <div @click="navToMine()">
        <img src="../assets/icon_mine.png">
        <div class="mine-text">申请列表</div>
      </div>
    </div>
    <div class="apply-block single-block">
      <div @click="navToExamine">
        <img src="../assets/icon_apply.png">
        <div class="mine-text">审批列表</div>
      </div>
    </div>
    <div class="apply-block single-block">
      <div @click="navToSearch">
        <img src="../assets/search_icon.png">
        <div class="mine-text">查询</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import "../styles/public.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
// var setupWebViewJavascriptBridge = function(callback) {
//   if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//     if (window.WebViewJavascriptBridge) {
//       return callback(WebViewJavascriptBridge);
//     }
//     if (window.WVJBCallbacks) {
//       return window.WVJBCallbacks.push(callback);
//     }
//     window.WVJBCallbacks = [callback];
//     var WVJBIframe = document.createElement("iframe");
//     WVJBIframe.style.display = "none";
//     WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
//     document.documentElement.appendChild(WVJBIframe);
//     setTimeout(function() {
//       document.documentElement.removeChild(WVJBIframe);
//     }, 0);
//   } else if (/(Android)/i.test(navigator.userAgent)) {
//     console.log("enter android")
//     // 这是Android
//     if (window.WebViewJavascriptBridge) {
//       console.log("enter has bridge")
//       callback(WebViewJavascriptBridge);
//     } else {
//       console.log("no bridge")
//       document.addEventListener(
//         "WebViewJavascriptBridgeReady",
//         function() {
//           callback(WebViewJavascriptBridge);
//         },
//         false
//       );
//     }
//   } else {
//     //PC
    
//   }
// }
// var callNative = function(type, json, callback) {
//     setupWebViewJavascriptBridge(function(bridge) {
//         bridge.callHandler(type, json, function(responseData) {
//             callback(responseData)
//         });
//     })
// }
export default {
  name: "vacationIndex",
  data() {
    return {
      getToken:0,
      usercode:"luyangb",
      appversion:"no_appversion",
      deviceId:"no_deviceid",
      osversion:"no_osversion",
      phoneNumber:"no_phonenumber"
    };
  },
  methods: {
    
    navToSearch:function(){
      var _this = this;
    this.$router.push({name: 'search', params: {
      usercode:_this.usercode,
    }})
    },
   navToMine:function(){
     var _this = this;
    this.$router.push({name: 'vacationlist', params: {
      usercode:_this.usercode,
    }})
   },
    navToExamine:function(){
      var _this = this;
      this.$router.push({name: 'examinelist', params: {
        usercode:_this.usercode,
      }})
    },
    navToApply:function(){
      var _this = this;
      this.$router.push({name:'vacationapply',params:{
        usercode:_this.usercode,
        appversion:_this.appversion,
        deviceId:_this.deviceId,
        osversion:_this.osversion,
        phoneNumber:_this.phoneNumber
      }});
    },
    goback:function(){
      let params1 = {
        params: {
          transtype: "exit_back"
        }
      };
      this.callNative("gotoNative", params1, function(data) {
          console.log(data)
      })
    }
  },

  created: function() {},
  watch: {
    getToken(val, oldVal) {
      if(val==1){
        Indicator.close();
        //初始化信息完成
      }
    }
  },
  mounted:function(){
    Indicator.open('加载中');
    let _this = this;
    //获取用户信息
    let params1 = {
      params: {
        transtype: "request_token"
      }
    };
    _this.callNative("gotoNative", params1, function(data) {
        for(var i in data){           
          try{
              data[i] = JSON.parse(data[i])
          }catch(e){
              
          }
        }
        _this.usercode = data.result.user_code;
        _this.appversion = data.result.appversion;
        _this.deviceId = data.result.deviceId;
        _this.osversion = data.result.osversion;
        _this.phoneNumber = data.result.phoneNumber;
        _this.getToken = 1;
        Indicator.close()
    })
  }
};
</script>
<style scoped>
body{
  background:#e4e4e4;
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
  .container{
    margin-top:45px;
  }
  .nav{
    width:100%;
    height:200px;
    background:#fff;
  }
  .single-block{
    height:100px;
    width:50%;
    background:#fff;
    float:left;
    text-align: center;
    font-size: 14px;
  }
  .single-block img{
    width:30px;
    margin:18px 0 10px 0;
  }
  
</style>



