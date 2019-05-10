<template>
<div class="container">
 <div class="header">
    {{this.$route.params.name}}的{{this.$route.params.kind}}
    <a class="goback" @click="goback()"></a>
  </div>
  
 

</div>
 
  
</template>

<script>


// import "../styles/vacationlist.css";
import { Loadmore } from 'mint-ui';
export default {
  name: "applydetail",
  data() {
    return {
    
    };
  },
  methods: {
   
    goback:function(){
      this.$router.push({name: 'examinelist', params: {}})
    },
    loadTop:function(){

    },
    loadBottom:function(){

    },
    getData:function(){
    

    }
    
  },
  created: function() {},
  mounted:function(){
    this.getData();
    this.info = this.$route.params;
    
  }
};

</script>
<style scoped>
  .container{
    margin-top:45px;
  }
  body{
    background:#e4e4e4;
    box-sizing: border-box;
    padding-bottom: 90px;
    padding-top: 90px;
  }
  .header{
    height:44px;
    width:100%;
    background:#fff;
    font-size: 17px;
    text-align: center;
    line-height: 44px;
    position: relative;
    border-bottom:1px solid #EDEDED;
    position: fixed;
    top:0;left:0;
    z-index:2;
  }
  .goback{
    width:30px;
    height:44px;
    display: block;
    position: absolute;
    left:0;top:0;
    background:url('../assets/Shape@2x.png') no-repeat center;
    background-size:8px 16px;
  }
  .filter{
    width:100%;
    height:44px;
    line-height: 44px;
    display: flex;
    display: -webkit-flex;
    border-bottom:1px solid #EDEDED;
    background:#fff;
    position: fixed;
    top:45px;
    left:0;
    z-index:2;
  }
  .childFilter{
    flex:1;
    text-align: center;
    font-size: 15px;
  }
  .optionList{
    width:100%;
    height:0;
    overflow: hidden;
    transition:all 5s;
    background:#fff;
  }
  .filterCon{
    position: fixed;
    top:90px;
    left:0;
    z-index:2;
  }
  .optionListOpen{
    height:auto;
  }
  .optionList li{
    width:100%;
    height:44px;
    font-size: 15px;
    color:#000;
    line-height: 44px;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .optionList li .listCon{
    border-bottom:1px solid #BCBBC1;
    position: relative;
  }
  .iconCurrect{
    position: absolute;
    width:44px;
    height:44px;
    right:0;
    top:0;
    background: url('../assets/Checkmark@2x.png') no-repeat center;
    background-size: 100%;
  }
  .redClass{
    color:#FC6251 !important; 
  }
  .smallArr{
    width: 0;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: #000 transparent transparent transparent;
    margin:0 0 -10px 10px;
    display: inline-block;
    margin-top: -10px;
    transform: translateY(-8px);
    -webkit-transform: translateY(-8px);
    transition:all 0.3s;
    transform-origin:50% 20%;
  }
  .arrowRotate{
    transform: translateY(-8px) rotate(180deg);
    -webkit-transform: translateY(-8px)  rotate(180deg);
     border-color: #FC6251 transparent transparent transparent;
  }
  .btnCon{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
    background:#e4e4e4;
    height:70px;

  }
  .applyBtn{
    width:343px;
    height:50px;
    background: #FB6251;
    border-radius: 8px;
    font-size: 18px;
    color:#fff;
    text-align: center;
    line-height: 50px;
    margin:10px auto;
   
  }
  .applyLeft{
    width:75%;
    float:left;

  }
  .applyRight{
    width:25%;
    float:left;
  }
  .applyList{
    /* padding-top:43px; */
  }
  .mint-loadmore{
    padding-top:43px;
  }
  .applyList li{
    margin:10px 0;
    background:#fff;
    display: block;
    min-height: 102px;
    position: relative;
  }
  .clear{
    clear: both;
  }
  .applyIcon{
    width:25px;
    height:25px;
    float:left;
    border-radius: 4px;
    background:#FF9727;
    color:#fff;
    font-size: 16px;
    text-align: center;
    line-height: 25px;
    margin:0 5px 0 15px;
  }
  .applyTitleText{
    font-size: 17px;
    line-height: 25px;
  }
  .applyTitle{
    height:25px;
    margin:10px 0;
  }
  .applyTime{
    height:22px;
    line-height: 22px;
    font-size: 15px;
    box-sizing: border-box;
    padding-left:15px;
  }
  .applyTime span{
    font-size:12px;
  }
  .applyText{
    box-sizing: border-box;
    padding-left:15px;
    font-size: 15px;
    padding-top:5px;
    padding-bottom:10px;
  }
  .applyRight{
    /* height:100%; */
    width:25%;
  }
.applyRight1 img{
  width:76px;
  margin-top: 15px
}
.applyRight2{
  position: relative;

}
.applyStatus{
  position: absolute;
  top:10px;
  font-size:14px;
  color:#FF9727;
  right:15px;
}
.applyProgress{
  position: absolute;
  color:#00A6E8;
  width:60px;
  height:26px;
  text-align: center;
  line-height: 26px;
  font-size: 11px;
  border: 1px solid #00A6E8;
  border-radius: 4px;
  bottom:10px;
  right:15px;
}
.filterCon{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.3)
}
.container{
  height:100%;
}
#app{
  height:100%;
}

</style>



