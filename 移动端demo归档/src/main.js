// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import z_scale from '../static/js/z_scale.js'
// import VueResource from 'vue-resource'
import axios from 'axios';
import Vuex from 'vuex'
import 'mint-ui/lib/style.css'
import { Actionsheet } from 'mint-ui';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import vueWaterfallEasy from 'vue-waterfall-easy'
import store from "./store";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.config.productionTip = false
Vue.use(MintUI);
Vue.use(Vuex);
import qs from 'qs';
Vue.prototype.axios = axios
//let serverUrl = "http://47.103.44.127:80"
let serverUrl = "https://www.isuiliao.cn"
Vue.prototype.callService = (ev)=>{
  // axios.post(serverUrl+ev.hash,{params:ev.params}).then(function(res){
  //   console.log(res)
  // },function(){
  
  // })
  axios.post(serverUrl+ev.hash,  qs.stringify(ev.params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(res){
    ev.success(res.data)
  },function(res){
    ev.fail(res.data)
  })
}
//15611678921
var userinfo = {
		"accessToken": "8446239_2d0555c343a48a23a61491eb6f066304",
		"age": 18,
		"face_url": "http://playback.17biyi.com/header_default",
		"id": 8446239,
		"isThird_facebook": 0,
		"isThird_qq": 0,
		"isThird_twitter": 0,
		"isThird_wb": 0,
		"isThird_wx": 0,
		"job": 3,
		"jobDesc": "自由职业",
		"jobObj": {
			"code": 3,
			"name": "自由职业"
		},
		"phone": "15611678921",
		"sex": 1,
		"sig": "eJxFkF1PgzAUhv8L10YKtN002QXDUec*GK4zwRtSaacnxI6VskCM-13EEW*fJyfv*54vh6-3t6KqQObC5oGRzr2DnJsBq7YCo3JxtMr02COE*AiN9qJMDSfdCx95xPMDhP4lSKUtHGE4nGJM-eDuqmp479lmkUbL0JjtPvroWNrJebZLmo1nWcipK1gd62bNhDw-1hlvMzeEecXe*JJ553Z7eE3ih0S7Eb48L2JO0vSFFeoQPU1Wu3JVQjqbjWGyzId1v-1x349OER1LWvhUf7vwBBFK8ZWLojg12ua2q9Twju8faOpWyg__",
		"tokenSecret": "a45f13fc43102b6e0bd2789bf0d3d18c",
		"uid": 8446239
}
	var userinfo = {
		accessToken: "8447633_c955fc0140a8daaf29098d005298c9ce",
		age: 18,
		birthday: "",
		face_url: "http://playback.17biyi.com/header_default",
		id: 8447633,
		isThird_facebook: 0,
		isThird_qq: 0,
		isThird_twitter: 0,
		isThird_wb: 0,
		isThird_wx: 0,
		nickname: "",
		phone: "18741365059",
		sex: 1,
		sig: "eJxFkMtOwzAQRf8lWxCM49h1kFj0kfJQqrSiRbCy3Nippm1S47i0AfHvhEDE9hyN7r3zGSzTpytlLWqpvKROBzcBBJcdNmeLzkhVeONaTBhjIUBv342r8VC1IgTCSEgB-iVqU3kssDsUUTTglP6pGjctmyWr8UMiaFotXkw5Let0ff1M97Ezs2MkStjdN*wsRm-7dPmqH7dqiMkQc51tsiS72MbjkePT*eqOnUhZnD4UTArr43WzmAtFJg5u*zC9k926n-5R248L4H1Jj6X53cUBxID1XOX54Vh56Rtrund8fQNRjlbL",
		tokenSecret: "7d5364bb575e0650c1cbe6b055783679",
		uid: 8447633,
	}

localStorage.setItem("userInfo",JSON.stringify(userinfo))

// Vue.component(Loadmore.name, Loadmore);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

// q={};
// location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;
