<template>
  <div class="container topscroll" >
      <public-header :title="userInfo.nickname"></public-header>
      <div class="mainBanner">
        <img class="mainPic" :src="userInfo.face_url">
        <div class="position">
            <p class="address">{{userInfo.address}}</p> 
            <p class="address">接通率:{{userInfo.call_rate}}</p> 
        </div>
      </div>
      <div class="name-bar">
          <div class="name-left">
              <div class="name-top">
                  <span class="name">{{userInfo.nickname}}</span><span class="userid"> ID:{{userInfo.uid}}</span>
              </div>
              <div class="name-bot">个性签名: {{userInfo.introduction?userInfo.introduction:"这个人很懒，什么都没有留下～"}}</div>
          </div>
          <div class="name-right">
              <div class="focusBtn" @click="focus">{{focusText}}</div>
          </div>
      </div>
      <div class="age-bar">
            <div class="age-tag p-color"><span class="age-tag-icon" :class="[userInfo.sex==1?maleIcon:femaleIcon]"></span>{{userInfo.age}}</div>
           <div class="age-tag y-color">{{userInfo.jobDesc}}</div>
      </div>
      <div class="pay-bar">
          <div class="video-icon pay-icon"></div>
          <div class="video-pay"><span>{{userInfo.video_price}}</span>聊币/每分钟</div>
          <div class="tel-icon pay-icon"></div>
          <div class="tel-pay"><span>{{userInfo.voice_price}}</span>聊币/每分钟</div>
      </div>
      <div class="sub-title">聊天能力</div>
      <div class="ability-con">
          <div class="ability" v-for="(item,index) in userInfo.tagsList" :key="index">{{item.name}}</div>
          <div class="clear"></div>
      </div>
      <div class="sub-title gift-title">打赏 ({{userInfo.giftCount}})
          <div class="send-btn" @click="sendGift">¥ 打赏</div>
      </div>
      <div class="gift-con">
          <div class="gift" v-for="(item,index) in giftInfo" :key="index">
              <img :src="item.img_url">   
          </div>
            <div class="clear"></div>
      </div>
      
      <div class="bottom-bar">
          <div class="radio-bar">语音</div>
          <div class="video-bar">视频</div>
      </div>
      <div class="sendMsg" @click="sendMsg(uid)">
          <div class="sixin-icon"></div>
          <div class="sixin-text">私信</div>
      </div>
     
  </div>
</template>
<script>
// import "../styles/vacationlist.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
import PublicHeader from '@/components/public_components/header';
export default {
  name: "detail",
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
        giftInfo:[],


    };
  },
  methods: {
      sendGift(){
          this.$router.push({name:"gift", params: {uid:this.uid}})
      },
      sendMsg(uid){
        window.selToID = uid; //聊天对象id
        window.msgContent = "为了部落";
        window.selType = webim.SESSION_TYPE.C2C;
        onSendMsg();
      },
      focus(){
          if(this.isFocus==0){  //未关注
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
                    Toast("关注成功")
                }else{
                    Toast(res.err_msg)
                }
                },
                fail:function(){

                }   
            });  
          }else{                //已关注
                this.callService({
                hash:"/suiliao-api/suiliao/user/delFollow",
                params:{
                    uid:this.userInfo_mine.uid,
                    touid:this.userInfo.uid
                },
                success:(res)=>{
                console.log(res)
                if(res.err_code=="8888"){
                    this.isFocus = 0;
                    this.focusText = "关注";
                    Toast("已取消关注")
                }else{
                    Toast(res.err_msg)
                }
                },
                fail:function(){

                }   
            });  
          }
            
      },
      getSelectData(res){
        this.leaveKind = res.selected;
      },
      getSelectData2(res){
        this.leaveAim = res.selected;
      },
      returnFun(){
       
      }
  },
  created: function() {
     
  },
  mounted:function(){
       $(".footer").hide();
      this.userInfo_mine = JSON.parse(localStorage.getItem("userInfo"));
      console.log(this.userInfo_mine)
       this.uid = this.$route.params.uid;
       //test
       this.uid = "8001565";
       this.callService({
        //hash:"/suiliao-api/suiliao/user/getUserInfo",
        hash:"/suiliao-api/suiliao/live/getUserInfoForDetailPage",
        params:{
          uid:JSON.parse(localStorage.getItem("userInfo")).uid,
          channel:"suiliao",
          touid:this.uid
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
              this.userInfo = res.result.userInfo;
              this.giftInfo = res.result.userInfo.userGift;
                //判断是否关注
               this.callService({
                hash:"/suiliao-api/suiliao/user/checkFollow",
                params:{
                    uid:this.userInfo_mine.uid,
                    touid:this.userInfo.uid
                },      
                success:(res)=>{
                console.log(res)
                if(res.err_code=="8888"){
                    this.isFocus = res.result.flag
                    if(this.isFocus==0){    //未关注
                        this.isFocus = 0;
                        this.focusText = "关注"
                    }else{                  //已关注
                        this.isFocus = 1;
                        this.focusText = "已关注"
                    }
                }else{
                    Toast(res.err_msg)
                }
                },
                fail:function(){

                }
            }); 
          }else{
            Toast(res.err_msg)
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
    .gift-title{
        position: relative;
        .send-btn{
            position: absolute;
            right:13px;top:10px;
            border: 1px solid #FF8586;
            border-radius:15px;
            color:#FF8586;
            height:30px;
            line-height: 30px;
            text-align: center;
            padding: 0 12px;
        }
    }
    .gift{
        width:20%;
        float:left;
        margin:5px;
        img{
            width:100%;
        }
    }
    .sixin-icon{
        background: url("../../assets/suiliao/s-sixin@2x.png") no-repeat center;
        background-size:90%;
        width:25px;
        height:25px;
        margin:0 auto;
    }
    .sendMsg{
        width:50px;
        height:50px;
        background: rgba(0,0,0,0.32);
        position: fixed;
        right:10px;
        bottom:60px;
        color:#fff;
        border-radius: 50%;
        text-align: center;
        font-size:12px;
        padding-top:5px;
        box-sizing:border-box;
    }
    .container{
        margin-bottom:51px;
    }
    .bottom-bar{
        width:100%;
        height:51px;
        display: flex;
        position: fixed;
        left:0;
        bottom:0;
        font-size:17px;
        line-height:51px;
        text-align:center;
        .radio-bar{
            flex:1;
            background: #e1dddd;
            color:#333;
        }
        .video-bar{
            flex:1;
            background-image: linear-gradient(-213deg, #FF8687 0%, #FF1889 100%);
            color:#fff;
        }
    }
    .ability-con{
        border-bottom:1px solid #e3e3e3;
        width:97%;
        margin:0 auto;
        padding-bottom:10px;
        padding-top:5px;
    }
    .sub-title{
        font-size:14px;
        height:20px;
        line-height:20px;
        padding:15px 0 0 10px;
    }
    .ability{
        color:#545454;
        background: rgba(176,176,176,0.15);
        height:24px;
        line-height:24px;
        text-align: center;
        padding:0 10px;
        float:left;
        font-size:12px;
        border-radius:12px;
        margin:5px;
    }
    .clear{
        clear:both;
    }
    .video-icon{
        background: url("../../assets/suiliao/shouye@2x.png") no-repeat center;
        background-size:70%;
        margin-left:5px;
    }
    .tel-icon{
        background: url("../../assets/suiliao/s-yuyinpic@2x.png") no-repeat center;
        background-size:50%;
        margin-left:5px;
    }
    .pay-bar{
        width:97%;
        margin:0 auto;
        height:26px;
        background: rgba(103,150,254,0.10);
        border: 1px solid rgba(100,139,254,0.34);
        border-radius: 4px;
        display:flex;
        font-size:13px;
        color:#2A2A2A;
        line-height:26px;
        margin-top:10px;
    }
    .pay-icon{
        width:26px;
        height:26px;
    }
    .age-tag-icon{
        display: block;
        float:left;
        width:17px;
        height:17px;
        position: absolute;
        left:5px;top:0;
    }
    .maleIcon{

    background: url("../../assets/suiliao/male.png") no-repeat center;
    background-size:12px;
    }
    .femaleIcon{

    background: url("../../assets/suiliao/female.png") no-repeat center;
    background-size:12px;
    }
    .age-bar{
        height:19px;
        line-height:19px;
        font-size:12px;
        color:#fff;
        padding-left:5px;
        margin-top:5px;
        .age-tag{
            display: inline;
            padding:1px 10px;
            border-radius:9px;
           
        }

    }
    .p-color{
        background:#8131FD;
        padding:1px 10px 1px 25px !important;
        position: relative;
    }
    .y-color{
        background:#F9C772;
    }
    .footer{
        display: none;
    }
    .name-bar{
        display: flex;
        .name-right{
            width:80px;
            .focusBtn{
                width:61px;
                height:27px;
                line-height:27px;
                text-align: center;
                color:#6487FE;
                border:1px solid #6487FE;
                border-radius:14px;
                font-size:14px;
                margin-top:15px;
            }
        }
        .name-left{
            flex:1;
            padding-left:8px;
            .name-top{
                height:18px;
                padding-bottom:8px;
            }
            .name{
                font-size:17px;
                color:#333;
            }
            .userid{
                color:#999;
                font-size:13px;
                padding-left:5px;
            }
            .name-bot{
                color:#999;
                font-size:13px;
            }
        }
    }
    .mainBanner{
        position: relative;
        .position{
            position:absolute;
            .address{
                display: inline;
                background:rgba(0,0,0,0.32);
                color:#fff;
                font-size:12px;
                border-radius: 3px;
                padding:0 5px;
            }
            bottom:10px;
            left:10px;
        }
    }
    body{
        background:#e4e4e4;
        box-sizing: border-box;
        padding-bottom: 90px;
        padding-top: 90px;
    }
    .public-select{
        margin-top:45px;
    }
    .mainPic{
        width:100vw;
        // height:100vw;
    }
</style>



