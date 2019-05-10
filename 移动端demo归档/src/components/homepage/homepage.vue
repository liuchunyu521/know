<template>
<div class="container">
  <div class="header">
    <!-- <mt-button size="small" class="tab-btn"  @click.native.prevent="active = 'tab-container2'">活跃</mt-button> -->
    <mt-button size="small" class="tab-btn"  @click.native.prevent="active = 'tab-container1'">热门</mt-button>
    <!-- <mt-button size="small" class="tab-btn"  @click.native.prevent="active = 'tab-container3'">同城</mt-button> -->
  </div>
  <div>
   
  <mt-tab-container v-model="active">
    <mt-tab-container-item class="homepage-view" id="tab-container1" >
      <div class="swipe-con" style="height:134px;" v-show="showBanner">
        <mt-swipe :auto="5000">
          <mt-swipe-item class="sl-swipe swipe-1" v-for="(item,index) in bannerData" :key="index">
            <img :src="item.img_url" style="width:100%;">
          </mt-swipe-item>
        </mt-swipe>
      </div>
<div class="pullDown" :style="{top:moveTop}" :class="ifUp?'moveUpAnimate':''">
  <p>{{ifReload}}</p>
</div>
      <vue-waterfall-easy 
      :enablePullDownEvent="enablePullDownEvent"
       @click="jumpDetail" :imgsArr="imgsArr" 
       :imgError="imgErrorFn" 
       @scrollReachBottom="contactData"
       @pullDownEnd="endMove"
        @touchmove.native="pullDown($event)"
        @touchstart.native="pullDownStart($event)"
        ref="downRefresh"
      
       >
        <div class="img-info" slot-scope="props">
          <div class="info-con">
            <p class="some-info info-name">{{props.value.nickname}}</p>
            <div class="tag-sex" :class="[props.value.sex==1?maleIcon:femaleIcon]"></div>
            <p class="some-info info-age">{{props.value.age}}</p> 
            <div class="tag" :class="[kongxianicon]"></div>
          </div>
        </div>
         <div slot="waterfall-over">waterfall-over</div>
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
export default {
  name: "homepage",
  data() {
    return{
      active:"tab-container1",
      userid:"8446239",
      imgsArr:[],//首页列表数据
      bannerData:[],//首页banner数据
      page:1,//页数
      kongxianicon:"kongxian",
      maleIcon:"maleIcon",
      femaleIcon:"femaleIcon",
      enablePullDownEvent:true,

      moveTime: 0,			// 记录滚动事件触发次数
      pullStart: 0,			// 首次移动的初始Y轴位置
      pullMove: 0,			// 移动后当前点Y轴位置
      pullDistance: 0,		// 计算得到Y轴移动距离
      ifUp: false,			// 是否需要回弹动画
      moveTop: -50 + "px",	// 下拉刷新移动距离
      ifReload: "下拉刷新",	// 下拉刷新字样
      contentMove: "translate3d(0px, '+ 0 +'px, 0px)",	// 内容移动距离
      openPullDown: true,	 	// 开启下拉刷新
      showBanner:true

    }
  },
  components: {
    vueWaterfallEasy
  },
  created(){
    $(".footer").show();
  },
  mounted(){
      if(localStorage.getItem("mainList")){
        let mainList = JSON.parse(localStorage.getItem("mainList"));
        let nextPage = localStorage.getItem("nextPage")
          if(mainList&&mainList.length>0){  //有缓存的情况下
            this.imgsArr = mainList;
            this.page = nextPage
          }else{
            //获取首页数据
            this.getData();
          }
      }else{
          //获取首页数据
          this.getData();
      }
     
    // 获取首页轮播图
     this.callService({
        hash:"/suiliao-api/suiliao/sys/getAdConfigImg",
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
      
  },
  methods: {
     // 开始滚动
  pullDown(e){
	// 监听该组件的滚动
	let scrollTop = document.getElementsByClassName('vue-waterfall-easy-scroll')[0].scrollTop;
	this.moveTime++;
  // 当滚动到顶部的时候触发
  if(scrollTop>113){
    this.showBanner = false;
  }else{
    this.showBanner = true;
  }
	if(scrollTop ==0){
	  if(this.moveTime == 1){
		 if(this.moveTime%2 == 1){
		 // 记录下初始点的Y轴位置
		 this.pullStart = e.touches[0].pageY;		
		 }
	  }
	  // 记录下移动后点的Y轴位置 和 Y轴移动距离
	  this.pullMove = e.touches[0].pageY;						
	  this.pullDistance = this.pullMove - this.pullStart;		

	  // 如果计算出距离为负数则规定移动位置为0 重新确定初始点位置
	  if(this.pullDistance < 0){					
		this.moveTime = 0;
	  } else {
		// 可以理解为移动速度，防止手指移动到屏幕底端,下拉刷新跟到底端的情况发生
		let moveSpeed = this.pullDistance/2;
		this.ifUp = false;
		this.ifReload = "下拉刷新";
		this.contentMove = "translate3d(0px, " + moveSpeed + "px, 0px)";
		this.moveTop = (moveSpeed - 50) + "px";
		if(this.pullDistance >= 200){
		  this.ifReload = "释放刷新";
		  // console.log("ok");
		}
	  }
    }
  },
    // 点击屏幕
    pullDownStart(e){
    this.moveTime = 0;
    },
    endMove(){
      this.ifUp = true;
      if(this.pullDistance < 200){
        this.contentMove = "translate3d(0px, " + 0 + "px, 0px)";
        this.moveTop = -50 + "px";
      } else {
        this.contentMove = "translate3d(0px, " + 50 + "px, 0px)";
        this.moveTop = 0 + "px";
        this.ifReload = "加载中";
        this.page=0;
        localStorage.setItem('mainList',"");
        localStorage.setItem('nextPage',"");
        console.log(1)
        this.imgsArr = [];
        this.getData();
        
        // ...调用接口获取数据，成功后 ↓
        this.ifReload = "加载完成";
        setTimeout(()=>{
        this.contentMove = "translate3d(0px, " + 0 + "px, 0px)";
        this.moveTop = -50 + "px";
        console.log("完成刷新");
        this.pullDistance = 0;
        },1000);
      }
      },

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
      let _this = this;
      this.callService({
        hash:"/suiliao-api/suiliao/live/getHotRoomList",
        params:{
          uid:this.userid,
          nextPage:this.page
        },
        success:(res)=>{
          console.log(res)
          if(res.err_code=="8888"){
            if(res.result.length==0){       //没有数据了
              _this.$refs.waterfall.waterfallOver()
              return;
            }                        
            //有数据
            for(var i=0;i<res.result.length;i++){
              res.result[i].src = res.result[i].face_url
            }
            this.imgsArr = this.imgsArr.concat(res.result);
            console.log(this.imgsArr)
            localStorage.setItem("mainList",JSON.stringify(this.imgsArr));
            localStorage.setItem("nextPage",this.page);
            
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
<style scoped lang="scss">
 .pullDown{
	  position: absolute;
	  left: 0;
	  width: 100%;
	  text-align: center;
      z-index:1;
      
      p{
        font-size: 14px;
        padding: 20px 0;	
        // width: 100%;
        color:#fff;
        background:lightblue;
        
      }
    }
    .moveUpAnimate{
	  transition: 200ms ease all;
	  -webkit-transition: 200ms ease all;
    }

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
.header{
  height:45px;
  text-align: center;
  line-height:45px;
}
.pullDown p{
  margin-top:-10px;
}
</style>