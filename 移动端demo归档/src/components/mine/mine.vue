<template>
  <div class="container topscroll" >
      <div class="mine-header">
          <div class="mine-top">
              <div class="top-left">
                  <div class="left-1">
                      <div class="name">MR.袁</div>
                      <div class="idcard">ID:3000765</div>
                  </div>
                  <div class="left-2"><div class="sex-icon-man"></div>23</div>
                  <div class="left-3"></div>
              </div>
              <div class="top-right">
              </div>
          </div>
          <div class="mine-bot">
              <div class="bot-1">
                  <div class="gold-bar">
                        <div class="gold">1303</div>
                        <div class="yue-icon">
                            <div class="jinbi-icon"></div>余额</div>
                  </div>
              </div>
              <!-- <div class="bot-2">提现</div> -->
              <div class="bot-3" @click="chongzhi">充值</div>
          </div>
      </div>
       <div class="msg-list" @click="jumpHuiyuan">
            <div class="header-con huiyuan"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">我的会员</div>
                </div>
                <div class="main-right">
                    
                </div>
            </div>
        </div>
         <div class="msg-list" @click="jumpFocus">
            <div class="header-con guanzhu"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">我的关注</div>
                </div>
                <div class="main-right">
                   
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con zhanghu"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">账户安全</div>
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
  name: "mine",
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
      jumpFocus(){
          this.$router.push({name:"focus", params: {}})
      },
      chongzhi(){
            this.$router.push({name:"chongzhi", params: {}})
      },
      jumpHuiyuan(){
            this.$router.push({name:"member", params: {}})
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
       $(".footer").show();
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
                margin-top:10px;
                margin-left:10px;
                line-height:30px;
                .sex-icon-man{
                    width:10px;
                    height:30px;
                    background:url("../../assets/suiliao/s-nanxing@3x.png") no-repeat center;
                    background-size:90%;
                    float:left;
                    margin-right:5px;
                }
                 .sex-icon-women{
                    width:10px;
                    height:30px;
                    background:url("../../assets/suiliao/s-nvxing@3x.png") no-repeat center;
                    background-size:90%;
                    float:left;
                    margin-right:5px;
                }
            }
            .left-3{
                float:left;
                width:30px;
                height:30px;
                background:url("../../assets/suiliao/wd-bjxx@3x.png") no-repeat center;
                background-size:90%;
                margin-top:10px;
                margin-left:10px;
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
            .gold-bar{
                width:80px;
                margin: 34px 0 0 23px;
                .gold{
                    color:#fff;
                    text-align: center;
                    font-size:19px;
                }
                .yue-icon{
                    color:#999;
                    font-size:12px;
                    padding-left:17px;
                }
                .jinbi-icon{
                    width:15px;
                    height:15px;
                    background:url("../../assets/suiliao/cz-jiagepic@3x.png") no-repeat center;
                    background-size:contain;
                    float:left;
                    margin-right:5px;
                   
                }
            }
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
            color:#fff;
        }
    }
    .mine-header{
        height:210px;
        background-image: linear-gradient(-137deg, #262626 0%, #3E3E3E 100%);
    }
    .container{
        margin-bottom:45px;
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
                    height:60px;
                    line-height: 60px;
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
        .huiyuan{
            background:url("../../assets/suiliao/wode-huiyuan@2x.png") no-repeat center;
            background-size:40%;
        }
        .guanzhu{
            background:url("../../assets/suiliao/wd-guanzhu@2x.png") no-repeat center;
            background-size:36%;
        }
        .zhanghu{
            background:url("../../assets/suiliao/wd-anquan@2x.png") no-repeat center;
            background-size:34%;
        }
        .main-right{
            background:url("../../assets/suiliao/detail.png") no-repeat center;
            background-size:28%;
        }
    }
    
</style>



