<template>
  <div class="container topscroll" >
     <public-header :title="'关注'"></public-header>
    <div class="msglist-con">
        <div class="msg-list" @click="jumpToMyFocus">
            <div class="header-con"></div>
            <div class="main-con">
                <div class="main-left">
                    <div class="name">我关注的</div>
                </div>
                <div class="focus-num">40</div>
                <div class="main-right">
                   
                </div>
            </div>
        </div>
         <div class="msg-list">
            <div class="header-con fs"></div>
            <div class="main-con ">
                <div class="main-left">
                    <div class="name">我的粉丝</div>
                </div>
                <div class="focus-num">40</div>
                <div class="main-right">
                   
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
  name: "focus",
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
      jumpToMyFocus(){
           this.$router.push({name:"focus_detail", params: {}})
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
        $(".goback-btn").show();
        $(".corner-fun").show();
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
        .focus-num{
            line-height:40px;
            color:#999;
            font-size:12px;
        }
        height:40px;
        display: flex;
        .header-con{
            width:40px;
            height:40px;
            background:url("../../assets/suiliao/gz-guanzhu@2x.png") no-repeat center;
            background-size:45%;
        }
        .fs{
            background:url("../../assets/suiliao/gz-fensi@2x.png") no-repeat center;
            background-size:45%;
        }
        .main-con{
            flex:1;
            display: flex;
            border-bottom:1px solid #e1e1e1;
            .main-left{
                flex:1;
                .name{
                    color:#333;
                    font-size:14px;
                    height:40px;
                    line-height: 40px;
                }
                .msg{
                    color:rgb(144,144,144);
                    font-size:14px;
                    height:14px;
                }
            }
            .main-right{
                width:40px;
                height:40px;
                background:url("../../assets/suiliao/detail.png") no-repeat center;
                background-size:40%;
            }
        }
    }
</style>



