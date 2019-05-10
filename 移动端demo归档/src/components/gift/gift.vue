<template>
  <div class="container topscroll" >
      <public-header :title="'礼物列表'"></public-header>
      <div class="gift-con">
          <div class="gift" v-for="(item,index) in giftList" :key="index" @click="chooseGift(item)">
              <img :src="item.img_url">
          </div>
          <div class="clear"></div>
      </div>
     
  </div>
</template>
<script>
// import "../styles/vacationlist.css";
import { Loadmore } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import {MessageBox} from 'mint-ui'
import axios from 'axios';
import PublicHeader from '@/components/public_components/header'
export default {
  name: "gift",
  components:{PublicHeader},
  data() {
    return {
      userInfo_mine:"",
      uid:"",
      giftList:[],
      accountInfo:{},


    };
  },
  methods: {
     chooseGift(giftInfo){
        let giftCoin = giftInfo.price;
        let haveCoin = this.accountInfo.chatCoin || 0;
        console.log(giftCoin+"--"+haveCoin)
        if(giftCoin>haveCoin){  //金币不够
           MessageBox.confirm('', { 
             message: '金币余额不足', 
             confirmButtonText: '去充值', 
             cancelButtonText: '取消' 
             })
            .then(action => { 
                 if (action == 'confirm') {     //去充值
                    this.$router.push({name:"chongzhi", params: {}})
                }
             }).catch(err => { 
                 if (err == 'cancel') {     //取消
                    return;
                 } 
             });

        }
     }
     
  },
  created: function() {
     
  },
  mounted:function(){
       $(".footer").hide();
       this.userInfo_mine = JSON.parse(localStorage.getItem("userInfo"));
       this.uid = this.$route.params.uid;
       console.log(this.userInfo_mine)
       console.log(this.uid)
       //test
       this.callService({
        //hash:"/suiliao-api/suiliao/user/getUserInfo",
        hash:"/suiliao-api/suiliao/gift/getGiftList",
        params:{},
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
            this.giftList = res.result.giftList;
          }else{
            Toast(res.err_msg)
          }
        },
        fail:function(){

        }
      }); 
      //获取用户账户信息
       this.callService({
        hash:"/suiliao-api/suiliao/account/accountInfo",
        params:{
            uid:this.userInfo_mine.uid
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
            this.accountInfo = res.result;
          }else{
            Toast(res.err_msg)
          }
        },
        fail:function(){

        }
      });   
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
        margin:2%;
        border-radius: 3px;
        img{
            width:100%;
        }
        border:1px solid #e4e4e4;
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
        margin-top:45px;
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



