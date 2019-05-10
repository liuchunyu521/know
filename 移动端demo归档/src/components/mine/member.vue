<template>
  <div class="container topscroll" >
       <public-header :title="'我的会员'"></public-header>
       <div class="tip-bar">您还不是会员哦！无法享受会员特权</div>
        <div class="card"></div>
      
        <div class="msg-list">
            <div class="header-con icon-1"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">尊贵会员标识</div>
                    <div class="msg">炫酷的图标更显尊贵</div>
                </div>
                <div class="main-right">
                   
                </div>
            </div>
        </div>
          <div class="msg-list">
            <div class="header-con icon-2"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">图片视频免费看</div>
                    <div class="msg">每日图片视频免费观看一次</div>
                </div>
                <div class="main-right">
                   
                </div>
            </div>
        </div>
          <div class="msg-list">
            <div class="header-con icon-3"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">召唤主播上线</div>
                    <div class="msg">每日三次免费短信召唤主播上线</div>
                </div>
                <div class="main-right">
                  
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-4"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">专属VIP表情包</div>
                    <div class="msg">专属表情更夺目难忘</div>
                </div>
                <div class="main-right">
                  
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-5"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">查看访客记录信息</div>
                    <div class="msg">不错过每一次邂逅</div>
                </div>
                <div class="main-right">
                  
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-6"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">文字聊天免费</div>
                    <div class="msg">文字消息免费可发图片语音消息</div>
                </div>
                <div class="main-right">
                  
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
  name: "member",
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


    };
  },
  methods: {
      jumpHuiyuan(){
          
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
       $(".footer").hide();
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
    .footer{
        display: none;
    }
    .tip-bar{
        font-size: 12px;
        color: #FF4E4E;
        background: rgba(255,192,191,0.25);
        height:27px;
        width:100%;
        line-height: 27px;
        padding-left:20px;
        box-sizing: border-box;
    }
    .card{
        width:90%;
        height:148px;
        margin:10px auto 20px auto;
        background:url("../../assets/suiliao/hy-banner@2x.png") no-repeat center;
        background-size:contain;
    }
    .mine-top{
        display: flex;
        height:105px;
        .top-left{
            flex:1;
            padding-top:45px;
            padding-left:20px;
            .left-1{
                float:left;
                .name{
                    font-size:26px;
                    color: #FFFFFF;
                }
                .idcard{
                    font-size: 12px;
                    color: #FFFFFF;
                }
            }
            .left-2{
                float:left;
                font-size: 16px;
                color: #FFFFFF;
            }
            .left-3{
                float:left;
            }
        }
        .top-right{
            width:60px;
            height:60px;
            background:lightblue;
            border-radius:50%;
            margin:35px;
        }
    }
    .mine-bot{
        display: flex;
        height:105px;
        .bot-2{
            background: #5F5F5F;
            border-radius: 4px;
            width:73px;
            height:33px;
            text-align: center;
            line-height:33px;
        }
        .bot-1{
            flex:1;
            
        }
        .bot-3{
            background-image: linear-gradient(-211deg, #FF8687 0%, #FF1889 94%);
            box-shadow: 0 2px 6px 0 rgba(0,0,0,0.50);
            border-radius: 4px;
            width:73px;
            height:33px;
            text-align: center;
            line-height:33px;
            margin:40px 30px 0 0 ;
        }
    }
    .mine-header{
        height:210px;
        background-image: linear-gradient(-137deg, #262626 0%, #3E3E3E 100%);
    }
    .container{
        margin-bottom:45px;
        margin-top:45px;
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
                    height:16px;
                    padding:10px 0 6px 0;
                }
                .msg{
                    color:#999;
                    font-size:10px;
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
  
        .icon-1{
            background:url("../../assets/suiliao/hy-tq6@2x.png") no-repeat center;
            background-size:40%;
        }
         .icon-2{
            background:url("../../assets/suiliao/hy-tq1@2x.png") no-repeat center;
            background-size:40%;
        }
         .icon-3{
            background:url("../../assets/suiliao/hy-tq2@2x.png") no-repeat center;
            background-size:40%;
        }
         .icon-4{
            background:url("../../assets/suiliao/hy-tq3@2x.png") no-repeat center;
            background-size:40%;
        }
         .icon-5{
            background:url("../../assets/suiliao/hy-tq4@2x.png") no-repeat center;
            background-size:40%;
        }
         .icon-6{
            background:url("../../assets/suiliao/hy-tq1@2x.png") no-repeat center;
            background-size:40%;
        }
       
       
    }
    
    
</style>



