<template>
  <div id="app">
    <router-view/>
     <div class="footer">
        <div class="main-nav" @click="jump_nav(1)">
          <div class="nav-icon" :class="[focus==1?indexiconfocus:indexicon]"></div>
          <div class="nav-title">首页</div>
        </div>
        <!-- <div class="main-nav" @click="jump_nav2">视频秀</div>  
        <div class="main-nav" @click="jump_nav3">排行</div> -->
        <div class="main-nav" @click="jump_nav(4)">
          <div class="nav-icon" :class="[focus==4?msgiconfocus:msgicon]"></div>
          <div class="nav-title">消息</div>
        </div>
        <div class="main-nav" @click="jump_nav(5)">
          <div class="nav-icon" :class="[focus==5?mineiconfocus:mineicon]"></div>
          <div class="nav-title">我的</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basic",
  data() {
    return{
      focus:1,//当前底部页签
      indexiconfocus:"indexiconfocus",
      indexicon:"indexicon",
      msgiconfocus:"msgiconfocus",
      msgicon:"msgicon",
      mineiconfocus:"mineiconfocus",
      mineicon:"mineicon",

    }
  },
  created(){
   
  },
  mounted(){
   
  },
  methods: {
    jump_nav(index){
      this.focus = index;
      let pagename = "homepage"
      if(index==1){
        pagename = "homepage"
      }else if(index==4){
        pagename = "message"
      }else if(index==5){
        pagename = "mine"
      }
       this.$router.push({name: pagename, params: {}})
    },
  }

};
</script>

<style scoped lang="scss">
body,html{
  width:100%;
  height:100%;
}
.indexicon{
  background:url("./assets/suiliao/shouye@2x.png") no-repeat center;
  background-size:24px;
}
.indexiconfocus{
  background:url("./assets/suiliao/shouyeh@2x.png") no-repeat center;
  background-size:24px;
}
.msgiconfocus{
  background:url("./assets/suiliao/xiaoxih@2x.png") no-repeat center;
  background-size:24px;
}
.msgicon{
  background:url("./assets/suiliao/xiaoxi@2x.png") no-repeat center;
  background-size:24px;
}
.mineiconfocus{
  background:url("./assets/suiliao/gerenh@2x.png") no-repeat center;
  background-size:24px;
}
.mineicon{
  background:url("./assets/suiliao/geren@2x.png") no-repeat center;
  background-size:24px;
}
* {
  margin: 0;
  padding: 0;
}
.nav-title{
  font-size:12px;
}
.nav-icon{
  height:27px;
}
ul, li {
  list-style: none;
}
a {
  text-decoration: none;
}
img {
  border: none;
}
html {
  height:100%;
}
.main-nav{
    flex:1;
    text-align: center;
}
.footer{
    width:100%;
    height:49px;
    position: fixed;
    bottom:0;
    display: flex;
    opacity:0.9;
    background:#fff;
}
.clear{
  clear:both;
}
</style>
