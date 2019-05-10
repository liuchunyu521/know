<template>
  <div class="container topscroll" >
       <public-header :title="'充值'"></public-header>
        <div class="card">
            <div class="txt1">1303</div>
            <div class="txt2">资产总额（金币)</div>
            <div class="txt3">充值会员</div>
        </div>
      
        <div class="msg-list">
            <div class="header-con icon-1"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>1000</span></div>
                </div>
                <div class="price">¥10.0元</div>
                <div class="main-right">
                   购买
                </div>
            </div>
        </div>
          <div class="msg-list">
            <div class="header-con icon-2"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>5000</span></div>
                </div>
                  <div class="price">¥50.0元</div>
                <div class="main-right">
                   购买
                </div>
            </div>
        </div>
          <div class="msg-list">
            <div class="header-con icon-3"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>10000</span></div>
                </div>
                <div class="price">¥100.0元</div>
                <div class="main-right">
                  购买
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-4"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>28800</span></div>
                </div>
                  <div class="price">¥288.0元</div>
                <div class="main-right">
                  购买
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-5"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>58800</span></div>
                </div>
                  <div class="price">¥588.0元</div>
                <div class="main-right">
                  购买
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con icon-6"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">金币<span>159800</span></div>
                </div>
                  <div class="price">¥1598.0元</div>
                <div class="main-right">
                  购买
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
  name: "chongzhi",
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
       $(".footer").hide();

  },
  mounted:function(){
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
        margin:56px auto 20px auto;
        background-image: linear-gradient(-213deg, #FF8687 0%, #FF1889 100%);
        border-radius: 12px;
        .txt1{
            font-family: PingFangSC-Semibold;
            font-size: 36px;
            color: #FFFFFF;
            text-align: center;
            height:36px;
            line-height:36px;
            padding:20px 0 10px 0;
        }
        .txt2{
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #FFFFFF;
            text-align: center;
            height:12px;
            line-height: 12px;
            padding-bottom:15px;
        }
        .txt3{
            border: 2px solid #FFFFFF;
            border-radius: 32.5px;
            width:110px;
            height:29px;
            text-align: center;
            margin:0 auto;
            color:#fff;
            line-height:29px;
        }
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
        margin:0 15px;
        box-sizing: border-box;
         border-bottom:1px solid #e1e1e1;
        .header-con{
            width:60px;
            height:60px;
        }
        .main-con{
            flex:1;
            display: flex;
           
            .price{
                font-size: 16px;
                color: #FD8283;
                line-height:60px;
                padding-right:20px;
            }   
            .main-left{
                flex:1;
                .name{
                    color: #999999;
                    font-size:17px;
                    height:60px;
                    line-height:60px;
                    span{
                        padding-left:5px;
                    }
                }
                .msg{
                    color:#999;
                    font-size:10px;
                    height:14px;
                }
            }
            .main-right{
                width:64px;
                height:30px;
                background: #6D6D6D;
                border-radius: 4px;
                margin-top:15px;
                color:#fff;
                font-size:14px;
                line-height:30px;
                text-align: center;
  
            }
        }
        .header-con{
            background:url("../../assets/suiliao/cz-jiagepic@3x.png") no-repeat center;
            background-size:40%;
        } 
    }
    
    
</style>



