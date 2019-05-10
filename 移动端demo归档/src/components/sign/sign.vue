<template>
<div class="container">
    <div class="btn-login login-text" @click="navtologin">登陆</div>
    <div class="btn-sign  login-text" >注册</div>
    <div class="login-phone">
        <div class="num-add">+86</div>
        <input class="login-phonenum" v-model="tel" type="number" placeholder="请输入手机号">
    </div>
    <div class="msg-bar">
      <input class="yanzhengma-num" v-model="yanzhengma" placeholder="请输入验证码">
      <div class="send-yanzhengma" @click="sendMsg">发送验证码</div>
    </div>
    <div class="login-psd">
        <input class="login-psd" v-model="psd" placeholder="设置密码为1～16位字母和数字组合">
    </div>
    <div class="login-psd">
        <input class="login-psd" v-model="psd2" placeholder="再次输入密码">
    </div>
    <div class="fogot-bar">
        <div class="choose-block" @click="changeAgreeState" :class="[tongyi?agreeicon:disagreeicon]"></div>
        <div class="agree">同意随聊《<span class="xieyi">用户注册协议</span>》</div>
    </div>
    <button class="login-btn" @click="login" :class="[isready=='yes'?canlogin:cannotlogin]">完成</button>  
</div>

</template>
<script>
// import "../styles/vacationapply.css";
import { MessageBox } from 'mint-ui';
import { DatetimePicker } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { Actionsheet } from 'mint-ui';
import axios from 'axios';
export default {
  name: "login",
  data() {
    return{
      canlogin:"can-login",
      cannotlogin:"cannot-login",
      tel:"",
      psd:"",//密码
      isready:"no",
      tongyi:true,//同意
      agreeicon:"agreeicon",
      disagreeicon:"disagreeicon",
      yanzhengma:"",//验证码
      psd2:"",//密码2
    }
  },
  watch:{
      tel(val){
          if(this.tel!=""&&this.psd!=""&&this.tongyi==true&this.tongyi!=""&this.psd2!=""&&this.psd==this.psd2){
              this.isready="yes"
          }
          else{
               this.isready="no"
          }
      },
      psd(val){
        if(this.tel!=""&&this.psd!=""&&this.tongyi==true&this.tongyi!=""&this.psd2!=""&&this.psd==this.psd2){
            this.isready="yes"
        }
        else{
            this.isready="no"
        }
      },
      tongyi(val){
        if(this.tel!=""&&this.psd!=""&&this.tongyi==true&this.tongyi!=""&this.psd2!=""&&this.psd==this.psd2){
            this.isready="yes"
        }
        else{
            this.isready="no"
        }
      },
      yanzhengma(val){
        if(this.tel!=""&&this.psd!=""&&this.tongyi==true&this.tongyi!=""&this.psd2!=""&&this.psd==this.psd2){
            this.isready="yes"
        }
        else{
            this.isready="no"
        }
      },
      psd2(val){
        if(this.tel!=""&&this.psd!=""&&this.tongyi==true&this.tongyi!=""&this.psd2!=""&&this.psd==this.psd2){
            this.isready="yes"
        }
        else{
            this.isready="no"
        }
      }
  },
  created(){
  
  },
  mounted(){
    
  },
  methods: {
   
    sendMsg(){
     
      if(this.tel==""){
        Toast("请输入手机号")
         console.log(this.tel)
        return 
      }
      this.callService({
      hash:"/suiliao-api/suiliao/sys/getValidCode",
      params:{
        phone:this.tel,
        type:6,
      },
      success:function(res){
        console.log(res)
        if(res.err_code=="8888"){
          Toast("已发送")
        }else{
          Toast(res.err_msg)
        }
      },
      fail:function(){

      }
     });
      console.log("send-msg")
    },
    changeAgreeState(){
        this.tongyi = !this.tongyi;
    },
    login(){
        if(this.isready=="no"){
            return false;
        }else{
           this.callService({
              hash:"/suiliao-api/suiliao/sys/login",
              params:{
                phone:this.tel,
                code:this.yanzhengma,
                password:this.psd,
                third_type:6,
              },
              success:function(res){
                console.log(res)
                if(res.err_code=="8888"){
                  Toast("已发送")
                }else{
                  Toast(res.err_msg)
                }
              },
              fail:function(){

              }
            }); 
            
        }
    },
    navtologin(){
        this.$router.push({name:"login", params: {}})
    }
  }

};
</script>
<style  scoped lang="scss">
$pink:#FF8586;

.yanzhengma-num{
  flex:1;
  border:none;
  outline:none;
  font-size:14px;
 
}
.send-yanzhengma{
  width:105px;
  height:35px;
  border-radius:17px;
  color:$pink;
  background:rgba(255,133,134,0.12);
  line-height:35px;
  text-align: center;
}
*{
    margin:0;
    padding:0;
}

.agreeicon{
    background:url("../../assets/suiliao/zc-tyix@2x.png") no-repeat center;
    background-size:14px;
}
.disagreeicon{
    background:url("../../assets/suiliao/zc-tyi@2x.png") no-repeat center;
    background-size:14px;
}
.login-btn{
    width:90%;
    margin:0 auto;
    height:42px;
    line-height:42px;
    font-size:14px;
    display: block;
    border:none;
    margin-top:30px;
    outline: none;
}
.can-login{
    background:$pink;
    color:#fff;
}
.cannot-login{
    background:#eee;
    color:#fff;
}
.fogot-bar{
    height:20px;
    display:flex;
    font-size:12px;
    width:90%;
    margin:0 auto;
    .choose-block{
        width:20px;
        height:20px;
        margin-top:-1px;
        margin-right:3px;
    }
    .agree{
        color:#999;
        font-size:12px;
        flex:1;
        span{
            color:$pink;
        }
    }
    .fogot-btn{
        color:$pink;
    }
}
.container{
    width:100vw;
    height:100vh;
    background:#fff;
    position: absolute;
    z-index:9999;
    overflow: hidden;
}
.login-text{
    font-size:20px;
    font-weight: 100;
    padding-left:20px;
    height:20px;
    line-height:20px;
}
.login-phone{
    width:90%;
    margin:30px auto 20px auto;
    border-bottom: 1px solid #E3E3E3;
    display:flex;
    height:40px;
    font-size:14px;
    .num-add{
        width:40px;
        line-height: 40px;
    }
    .login-phonenum{
        outline: none;
        flex:1;
        line-height:40px;
        font-size:14px;
        border:none;
    }
}
.login-psd{
    width:90%;
    margin:0 auto 20px auto;
    border-bottom: 1px solid #E3E3E3;
    display:flex;
    height:40px;
    font-size:14px;
    display:flex;
    .login-psd{
        outline: none;
        flex:1;
        line-height:40px;
        font-size:14px;
        border:none;
        height:38px;
    }
}
.btn-login{
    padding-top:50px;
}
.btn-sign{
    font-weight: bold;
    padding-top:20px;
}
.clear{
  clear:both;
}
.msg-bar{
  width:90%;
  margin:0 auto 20px auto;
  border-bottom: 1px solid #E3E3E3;
  display:flex;
  height:40px;
  font-size:14px;
}
</style>