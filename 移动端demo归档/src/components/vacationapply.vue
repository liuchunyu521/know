<template>
<div class="container">
 <div class="header">
    休假申请
    <a class="goback"  @click="goback()"></a>
  </div>
  <div class="selectKind">
    <div class="kindTitle" >休假类型</div>
    <div class="kindCon">
      <div style="width:100%;height:100%;">
        <div class="singleKind" v-for="(item,index) in singleKind" :key="index" @click="chooseKind(index)"  v-bind:class="[chooseIndex==index ? chooseStyle : '']">{{item}}</div>
      </div>
      
    </div>
  </div>
   <mt-datetime-picker
    ref="picker"
    type="datetime"
    v-model="pickerValue"
    :startDate="startDate"
    @confirm="handleConfirm"
    >
  </mt-datetime-picker>
   <mt-datetime-picker
    ref="picker2"
    type="datetime"
    v-model="pickerValue2"
    :startDate="startDate"
    @confirm="handleConfirm2"
    >
  </mt-datetime-picker>

  <mt-actionsheet
    :actions="actions"
    v-model="sheetVisible">
  </mt-actionsheet>

  <ul class="selectTimeUl">
    <li>
      <div class="singleTime">
        <div class="timeTitle">开始时间</div>
        <input v-model="startTime" class="timeInput" type="text" readonly="readonly" placeholder="请选择开始时间 (必填)" @click="openPicker()"/>
      </div>
    </li>
    <li>
      <div class="singleTime">
        <div class="timeTitle">结束时间</div>
        <input v-model="endTime" class="timeInput" type="text" readonly="readonly" placeholder="请选择结束时间 (必填)" @click="openPicker2()"/>
      </div>
    </li>
    <!-- <li>
      <div class="timeTitle">总时长</div>
        <div>{{dateCalc}}</div>
    </li> -->
  </ul>
  <div class="reasonCon">
    <div class="reasonTitle">
      请假说明 
    </div>
    <textarea placeholder="请输入休假说明 (必填)" v-model="des"> 


    </textarea>
  </div>
  <div class="photoCon">
      <div class="reasonTitle">
        附件
         <div class="selectPhotoBtn" @click="choosePhoto">
          </div>
      </div>
      <div class="smallPhotoCon">
        <div class="photo-con" v-for="(item,index) in imgArr" :key="index" >
          <div class="deletePhoto" @click="deletePhoto(index)">×</div>
          <img class="thumbnail" :src="'data:image/jpg;base64,'+item">
        </div>
        <div class="clear"></div>
        <!-- <img class="thumbnail" src="../assets/demo.jpg"> -->
      </div>
  </div>
   <div class="tip" v-if="chooseIndex==0||chooseIndex==1||chooseIndex==4||chooseIndex==7">
      <div class="tiplist" v-for="(item,index) in tiplist[chooseIndex]" :key="index">{{item}}</div>
    </div>
  <div class="submitBtn" @click="submitApply">
    提交
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
export default {
  name: "vacationapply",
  data() {
    return {
      showFile:false,
      fileArr:["../../static/img/demo.jpg","../../static/img/demo.jpg"],
      pickerValue:'',
      pickerValue2:'',
      pickerVisible:'',
      singleKind:['事假','病假','调休','年假','婚假','产假','陪产假','丧假'],
      chooseStyle: "chooseStyle",
      chooseIndex:100,
      startDate: new Date(),
      startTime:'',
      endTime:'',
      startStamp:0,
      endStamp:0,
      stampCalc:0,
      dateCalc:'',
      des:'',
      actions:[{name:"拍照",method:this.useCamera},{name:"从相册中选择",method:this.usePhoto}],
      sheetVisible:false,
      imgArr:[],
      tiplist:[
        ["1、事假在 3 天以内（含）的提前 1个工作日申请","2、事假在 3 天以上的，提前 3 个工作日申请，还须经隔级主管和人力资源部门批准","3、遇情况紧急来不及履行正式请假手续的， 须事先通过电话等手段请示直接主管，获准后方可休假，但假期结束后 2 日内须补办请假手续"],
        ["1、病假在 3 天及以内的，须提前向直接主管请假","2、病假在 3 天（含）以上者须配套提交员工本人在国家二级（含）以上医院开具的病假条（包括但不限于检查记录、病历），向隔级主管和人力资源部门请假"],
        [],
        [],
        ["自领取结婚证之日起六个月内有效，申请婚假时须有结婚证书等有效证明"],
        [],
        [],
        ["员工配偶、父母、祖父母、配偶父母、配偶祖父母、子女逝亡，可给予 5 个工作日丧假，丧假应一次休完"],
        ],
        usercode:"shixg",
        days:"",
        imagePath:[],
        address:"no_address",
        latitude:"no_latitude",
        longitude:"no_longitude",
        ncImgArr:[]
    };
  },
  created(){
   
  },
  mounted(){
    Indicator.open('加载中');
    var _this = this;
    var ua = navigator.userAgent.toLowerCase();//设备信息
    var u = navigator.userAgent;
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {       ///iphone|ipad|ipod/.test(_this.ua)
          _this.platForm = "ios"      
      } else if (ua.indexOf('android') > -1 || ua.indexOf('adr') > -1) {      ///android/.test(this.ua)
          _this.platForm = "android";
      } else {
          _this.platForm = "android"
      }

    this.usercode = this.$route.params.usercode;
    this.appversion = this.$route.params.appversion;
    this.deviceId = this.$route.params.deviceId;
    this.osversion = this.$route.params.osversion;
    this.phoneNumber = this.$route.params.phoneNumber;
    let params2 = {
          params: {
            transtype: "request_move"
          }
        };
    this.callNative("gotoNative", params2, function(data) {
       Indicator.close()
       if(_this.platForm=='android'){
            _this.latitude = data.result.mapaddressinfo.latitude;
            _this.longitude = data.result.mapaddressinfo.longitude;
            _this.address = data.result.mapaddressinfo.address;
        }
        if(_this.platForm=='ios'){
          console.log(data)
          console.log(typeof data)
            _this.latitude = JSON.parse(JSON.parse(data.result).adressinfo).latitude;
            _this.longitude = JSON.parse(JSON.parse(data.result).adressinfo).longitude;
            _this.address = JSON.parse(JSON.parse(data.result).adressinfo).address;
        }
        console.log(_this.latitude)
        console.log(_this.longitude)
        console.log(_this.address)
      // _this.latitude = data.result.mapaddressinfo.latitude;
      // _this.longitude = data.result.mapaddressinfo.longitude;
      // _this.address = data.result.mapaddressinfo.address;
      _this.getPositon = 1;
    })
  },
  methods: {
    deletePhoto(index){
      console.log(index)
      this.imgArr.splice(index,1);
      this.imagePath.splice(index,1)
    },
    useCamera:function(){
      let _this = this;
      //调用原生相机
      let params1 = {
        params: {
          transtype: "takephote"
        }
      };
      this.callNative("gotoNative", params1, function(data) {
         if(typeof data == "string"){  
           data = JSON.parse(data)
         }
         //判斷
         if(_this.platForm=="ios"){
            _this.imagePath.push(data.result.photostring[0].imagePath);
            _this.imgArr.push(data.result.photostring[0].bitmapToBase64)
         }else{
            _this.imagePath.push(data.result.imagePath);
            _this.imgArr.push(data.result.photostring)
         }
      })
    },
    usePhoto:function(){
      let _this = this;
      //调用原生相册
      let params1 = {
        params: {
          transtype: "openalbum"
        }
      };
      this.callNative("gotoNative", params1, function(data) {
        for(var i in data){           
          try{
              data[i] = JSON.parse(data[i])
          }catch(e){
              
          }
        } 
        for(var i=0;i<data.result.photostring.length;i++){
          _this.imagePath.push(data.result.photostring[i].imagePath);
          _this.imgArr.push(data.result.photostring[i].bitmapToBase64)
        }
      })
    },
    choosePhoto:function(){
      this.sheetVisible = true;
    },
    goback:function(){
    this.$router.push({name: 'vacationIndex', params: {
      usercode:this.usercode,
    }})

  },
  submitApply:function(){
    let _this = this;
   
    
    if(this.chooseIndex==100){
      Toast('请选择请假类型');
      return false;
    }
    if(this.startTime==''){
      Toast('请选择开始时间');
      return false;
    }
    if(this.endTime==''){
      Toast('请选择结束时间');
      return false;
    }
     if(this.des==''){
      Toast('请填写请假说明');
      return false;
    }
     if(this.days==''){
      Toast('获取时间失败，请重新选择时间');
      return false;
    }
    
    Indicator.open('提交中');
    let arr = [];
    let transtype = ""
    if(_this.platForm=="android"){  
      transtype = "ncUploadfile";
      for(var i=0;i<_this.imagePath.length;i++){
        let obj = {};
        obj.imagePath = _this.imagePath[i];
        arr.push(obj);
      }
    }else{
      transtype = "UpdataServiceCall";
      for(var i=0;i<_this.imagePath.length;i++){
        let obj = {};
        obj.imagePath = _this.imagePath[i];
        obj.bitmapToBase64 = _this.imgArr[i]
        arr.push(obj);
      }
    }

    console.log(arr)

    
    var params3 =  {
        params:{
            "transtype" : transtype,
            "imageScale":"1",
            "pkBusi":"1",
            "photostring":arr
        }
     }
     _this.callNative("gotoNative", params3, function(data){
      console.log(data)
      if(_this.platForm=="android"){
          var arr = data.success;
          for(var i=0;i<arr.length;i++){
            _this.ncImgArr.push(arr[i].fileurl)
          }
      }else{
        for(var i=0;i<data.result.success.length;i++){
           _this.ncImgArr.push(data.result.success[i].absolute_path)
        }
      }
     
      console.log(_this.ncImgArr)
        _this.submitCall();
    })
   
  },
  submitCall:function(){
      let _this = this;
      let data = {};
      data.leavetype = this.singleKind[this.chooseIndex];
      data.begindate = this.startTime;
      data.enddate = this.endTime;
      data.leavedes = this.des;
      data.transtype = "submitleave";
      data.usercode = this.usercode;
      data.appversion = this.appversion;
      data.deviceId = this.deviceId;
      data.osversion = this.osversion;
      data.phoneNumber = this.phoneNumber;
      data.latitude = this.latitude;
      data.longitude = this.longitude;
      data.address = this.address;
      data.days = this.days;
      data.filelist = this.ncImgArr;
      console.log(data)
      let serverUrl = process.env.API_HOST;
        axios.get(serverUrl+"leave/submit",{params:data}).then(function(res){
          console.log(res)
          if(res.data.result.retflag==0){
              Toast('提交成功');
              Indicator.close();
              setTimeout(function(){
                _this.$router.push({name: 'vacationIndex', params: {}})
              },3000)  
            }
            else{
              Indicator.close();
              Toast('提交失败,请重试');
            }
            Indicator.close();
        },function(){
          setTimeout(function(){
            _this.$refs.loadmore.onTopLoaded();
          },15000)
        })
  },
    chooseKind:function(e){
      this.chooseIndex = e;
      let needPhotoIndex = this.singleKind[e];
      if(needPhotoIndex == "病假"||needPhotoIndex == "婚假"){
        this.showFile=true;
      }else{
         this.showFile=false;
      }

    },
    openPicker() {
      if(this.chooseIndex==100){
        Toast("请先选择请假类型");
        return false;
      }
      this.$refs.picker.open();
    },
    openPicker2() {
       if(this.chooseIndex==100){
        Toast("请先选择请假类型");
        return false;
      }
      this.$refs.picker2.open();
    },
    handleConfirm:function(e){
      if(this.platForm=="ios"){
         var time = this.parseTime(e, '{y}/{m}/{d} {h}:{i}:{s}')
      }else{
         var time = this.parseTime(e, '{y}-{m}-{d} {h}:{i}:{s}')
      }
      console.log(time)
      var hour = parseInt(time.charAt(11)+time.charAt(12))
      var min = parseInt(time.charAt(14)+time.charAt(15))
      var timelimit = hour*1000+min;
      if(timelimit<8030){
        Toast("请假时间段在8:30-17:30之间")
        return false;
      }
      if(timelimit>17030){
        Toast("请假时间段在8:30-17:30之间")
        return false;
      }
      if(timelimit>12000&&timelimit<13000){
        Toast("不可选择12:00-13:00期间")
        return false;
      }
      this.startTime = time;
      let result = new Date(time).getTime()
      this.startStamp = result;
      this.stampCalc = this.endStamp-this.startStamp;
      function formatDuring(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        return days + " 天 " + hours + " 小时 " +minutes+"分";
      }
      console.log(this.stampCalc)
      if(this.startStamp==0||this.endStamp==0){
        return false
      }
      
     if(this.stampCalc>0 && this.startStamp>0 && this.endStamp){
        this.dateCalc = formatDuring(this.stampCalc)
        var data = {};
        data.usercode = this.usercode;
        data.leavetype = this.singleKind[this.chooseIndex];
        data.transtype = "leavedays"
        data.starttime = this.startTime;
        data.endtime = this.endTime;
        this.getDays(data);
      }else{
        Toast({
            message: '结束时间要大于开始时间',
            position: 'center',
            duration: 2000
        })
        this.dateCalc = ''
        this.startTime = ""
      }

    },
     handleConfirm2:function(e){
      if(this.platForm=="ios"){
         var time = this.parseTime(e, '{y}/{m}/{d} {h}:{i}:{s}');
      }else{
         var time = this.parseTime(e, '{y}-{m}-{d} {h}:{i}:{s}');
      }
      var hour = parseInt(time.charAt(11)+time.charAt(12))
      var min = parseInt(time.charAt(14)+time.charAt(15))
      var timelimit = hour*1000+min;
      if(timelimit<8030){
        Toast("请假时间段在8:30-17:30之间")
        return false;
      }
      if(timelimit>17030){
        Toast("请假时间段在8:30-17:30之间")
        return false;
      }
      if(timelimit>12000&&timelimit<13000){
        Toast("不可选择12:00-13:00期间")
        return false;
      }
      this.endTime = time;
      let result = new Date(time).getTime()
      this.endStamp = result;
      this.stampCalc = this.endStamp-this.startStamp;
      console.log(this.stampCalc)
      function formatDuring(mss) {
        var days = parseInt(mss / (1000 * 60 * 60 * 24));
        var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = (mss % (1000 * 60)) / 1000;
        return days + " 天 " + hours + " 小时 " +minutes+"分  ";
      }
      console.log(formatDuring(this.stampCalc))
      console.log(this.startStamp)
      console.log(this.endStamp)
      console.log(this.stampCalc)
      if(this.startStamp==0){
         Toast({
          message: '请选择开始时间',
          position: 'center',
          duration: 2000
        })
        return false;
      }
      if(this.stampCalc>0 && this.startStamp>0 && this.endStamp>0){
        this.dateCalc = formatDuring(this.stampCalc)
         var data = {};
        data.usercode = this.usercode;
        data.leavetype = this.singleKind[this.chooseIndex];
        data.transtype = "leavedays"
        data.starttime = this.startTime;
        data.endtime = this.endTime;
        this.getDays(data);

      }else{
        this.dateCalc = ''
        Toast({
          message: '结束时间要大于开始时间',
          position: 'center',
          duration: 2000
        })
        this.endTime = "";
      }
    },
    parseTime:function(time, cFormat){


    if (arguments.length === 0) {
        return null;
    }

    if ((time + '').length === 10) {
        time = +time * 1000
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time == 'object') {
        date = time;
    } else {
        date = new Date(parseInt(time));
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;


    },
    getDays:function(data){
      let serverUrl = process.env.API_HOST
      let _this = this;
      axios.get(serverUrl+"leave/leavedays",{params:data}).then(function(res){
        console.log(res)
        if(res.data.result.retflag==0){
          _this.days = res.data.result.data;
           Toast(res.data.result.data+"天");
        }else{

        }
      },function(){
      })
    }
  }

};
</script>
<style scoped>
.clear{
  clear:both;
}
.deletePhoto{
   right:0;top:0;
   position:absolute;
   width:10px;
   height:10px;
   font-size:6px;
   text-align: center;
   line-height: 8px;
   background:#000;
   color:#fff;
   border-radius:50%;
}
.photo-con{
    width:50px;
    height:50px;
    float:left;
    position: relative;
    padding:5px;
   
}
.thumbnail{
  width:100%;
  height:100%;
  border:1px solid #fff;
  background-size:100%;
}
.reasonTitle{
  position: relative;
}
.selectPhotoBtn{
  position: absolute;
  right:15px;top:0;
  width:30px;
  height:30px;
  background:url('../assets/camer@2x.png') no-repeat center;
  padding:0 2px;
}
input{
  outline:none;
}
body{
    background:#e4e4e4;
    box-sizing: border-box;
    padding-bottom: 90px;
    padding-top: 45px;
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
  
#app{
  height:100%;
}
.selectKind{
  background:#fff;
  height:110px;
}
.kindTitle{
  height:40px;
  line-height: 30px;
  font-size: 15px;
  box-sizing: border-box;
  padding-left:15px;
  padding-top:10px;
  margin-bottom:10px;
  
}
.kindCon{
  height:60px;
  width:100%;
  overflow-x:scroll;
}
.singleKind{
  background: #F7F7F7;
  border-radius: 12px;
  font-size: 16px;
  color:#000;
  width:20%;
  height:24px;
  text-align: center;
  line-height:24px;
  font-size: 16px;
  float:left;
  margin:0 2.5% 5px 2.5%;
  transition:all .2s;
}
.chooseStyle{
  background:#FB6251;
  color:#fff;
}
.selectTimeUl{
  width:100%;
  background:#fff;
  margin-top:10px;
}
.selectTimeUl li{
  box-sizing:border-box;
  padding-left:15px;
  height:44px;
  line-height:44px;
  font-size: 15px;
}
.singleTime{
  border-bottom: 1px solid #BCBBC1;
  width:100%;
  height:100%;
}
.timeTitle{
  width:60px;
  margin-right:15px;
}
.timeTitle{
  float:left;
}
.timeInput{
  float:left;
  width:225px;
  height:100%;
  border:none;
  color:#999;
  background:transparent;
}
.reasonCon{
  height:120px;
  background:#fff;
  margin-top:10px;
  padding:10px 0 0 15px;
}
.reasonCon textarea{
  border:none;
  width:100%;
  height:90px;
  box-sizing: border-box;
  padding:10px;
  outline:none;
  width:300px;
  resize:none;
  font-size: 16px;
  font-family: "微软雅黑";
}
.submitBtn{
  width:343px;
  height:50px;
  background:#FB6251;
  background: #FB6251;
  border-radius: 8px;
  text-align: center;
  line-height: 50px;
  color:#fff;
  margin:0 auto;
  margin-top:30px;
}
.photoCon{
    background: #fff;
    margin-top: 10px;
    padding: 10px 0 10px 15px;
    /* margin-bottom:70px; */
}
.tip{
  background:#fff;
  margin-top:10px;
  box-sizing:border-box;
  padding:5px;
}
.tiplist{
  font-size:12px;
  color:#666;
  box-sizing:border-box;
  line-height:16px;
}
</style>


