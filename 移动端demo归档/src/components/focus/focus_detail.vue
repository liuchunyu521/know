<template>
<div class="container">
   <public-header :title="'我的关注'"></public-header>
  <div>
   
  <mt-tab-container v-model="active">
    <mt-tab-container-item class="homepage-view" id="tab-container1" >
      <div class="swipe-con" style="height:113px;" v-show="false">
        <mt-swipe :auto="5000">
          <mt-swipe-item class="sl-swipe swipe-1" v-for="(item,index) in bannerData" :key="index">
            <img :src="item.img_url" style="width:100%;">
          </mt-swipe-item>
        </mt-swipe>
      </div>

      <vue-waterfall-easy @click="jumpDetail" :imgsArr="imgsArr" :imgError="imgErrorFn" @scrollReachBottom="contactData">
        <div class="img-info" slot-scope="props">
          <div class="info-con">
            <p class="some-info info-name">{{props.value.nickname}}</p>
            <div class="tag-sex" :class="[props.value.sex==1?maleIcon:femaleIcon]"></div>
            <p class="some-info info-age">{{props.value.age}}</p> 
            <div class="tag" :class="[kongxianicon]"></div>
          </div>
        </div>
      </vue-waterfall-easy>

    </mt-tab-container-item>
    <mt-tab-container-item class="homepage-view"  id="tab-container2">
      22
    </mt-tab-container-item>
    <mt-tab-container-item class="homepage-view"  id="tab-container3">
      33
    </mt-tab-container-item>
  </mt-tab-container>
  </div>
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
import vueWaterfallEasy from 'vue-waterfall-easy'
import PublicHeader from '@/components/public_components/header'
export default {
  name: "focus_detail",
  data() {
    return{
      active:"tab-container1",
      userid:"8446239",
      imgsArr:[],//首页列表数据
      bannerData:[],//首页banner数据
      page:1,//页数
      kongxianicon:"kongxian",
      maleIcon:"maleIcon",
      femaleIcon:"femaleIcon"

    }
  },
  components: {
    vueWaterfallEasy,PublicHeader
  },
  created(){
   
  },
  mounted(){
    $(".footer").hide();
    $(".goback-btn").show();
    $(".corner-fun").show();
    // 获取首页轮播图
     this.callService({
        hash:"/suiliao-api/suiliao/sys/getDisplayImg",
        params:{
          channgel:"suiliao"
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
           this.bannerData = res.result;
          }else{
            Toast(res.err_msg)
          }
        },
        fail:function(){

        }
      }); 
      //获取首页数据
      this.getData()
  },
  methods: {
     jumpDetail(ev,{ index, value }){
       const uid = value.uid;
       this.$router.push({name:"detail", params: {uid:uid}})
     },
    imgErrorFn(res){
      console.log(res)
    },
    contactData(){
      this.page++;
      this.getData()
    },
    getData(){
      this.callService({
        hash:"/suiliao-api/suiliao/live/getHotRoomList",
        params:{
          uid:this.userid,
          nextPage:this.page
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
            for(var i=0;i<res.result.length;i++){
              res.result[i].src = res.result[i].face_url
              res.result[i].url = "www.baidu.com"
            }
             this.imgsArr = this.imgsArr.concat(res.result);
           
          }else{
            Toast(res.err_msg)
          }
        },
        fail:function(){

        }
      }); 
    }
  }

};
</script>
<style scoped>
.maleIcon{
  width:15px;
  height:30px;
  background: url("../../assets/suiliao/hnan@3x.png") no-repeat center;
  background-size:contain;
}
.femaleIcon{
  width:15px;
  height:30px;
  background: url("../../assets/suiliao/hnv@3x.png") no-repeat center;
  background-size:contain;
}
.kongxian{
  background: url("../../assets/suiliao/shouyezhuangtai@3x.png") no-repeat center;
  background-size:100%;
  margin-top:6px;
  margin-left:7px;
}
.tag{
  width:39px;
  height:18px;
}
.homepage-view{
  height:calc(100vh - 44px);
  width:100%;
  padding-top:44px;
}
.tab-btn{
  border:none;
  background:none;
}
.clear{
  clear:both;
}
.container .tab-btn{
  border:none;
  box-shadow: none;
}
.mint-swipe-indicators .is-active{
  background:#FF3589 !important;
}
.swipe-1{
  background:lightblue;
}
.swipe-2{
  background:lightgreen;
}
.swipe-3{
  background:lightcoral;
}
.info-name{
  font-size:14px;
  color:#333;
  width:110px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info-age{
  color:#999;
  font-size:15px;
}
</style>