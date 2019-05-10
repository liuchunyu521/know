import Vue from 'vue'
import Router from 'vue-router'
import vacationlist from '@/components/vacationlist'
import vacationapply from '@/components/vacationapply'
import examinelist from '@/components/examinelist'
import applyprocess from '@/components/applyprocess'
import applydetail from '@/components/applydetail'
import search from '@/components/search'
//homepage
import homepage from '@/components/homepage/homepage'
//login
import login from '@/components/login/login'
//sigh
import sign from '@/components/sign/sign'
//detail
import detail from '@/components/detail/detail'
//message
import message from '@/components/message/message'
//mine
import mine from '@/components/mine/mine'
//member
import member from '@/components/mine/member'
//chongzhi
import chongzhi from '@/components/chongzhi/chongzhi'
//focus
import focus from '@/components/focus/focus'
//focus_detail
import focus_detail from '@/components/focus/focus_detail'
//gift
import gift from '@/components/gift/gift'
//msg_detail
import msg_detail from '@/components/message/message_detail'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/gift',
      name: 'gift',
      component: gift,
    },
    {
      path: '/member',
      name: 'member',
      component: member,
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine,
    },
    {
      path: '/focus',
      name: 'focus',
      component: focus,
    },
    {
      path: '/focus_detail',
      name: 'focus_detail',
      component: focus_detail,
    },
    {
      path: '/chongzhi',
      name: 'chongzhi',
      component: chongzhi,
    },
    {
      path: '/msg_detail',
      name: 'msg_detail',
      component: msg_detail,
    },
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/sign',
      name: 'sign',
      component: sign,
    },
    {
      path: '/',
      name: 'mine',
      component: mine,
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage,
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
    },
    {
      path: '/message',
      name: 'message',
      component: message,
    },
    {
      path: '/vacationlist',
      name: 'vacationlist',
      component: vacationlist
    },
    {
      path: '/vacationapply',
      name: 'vacationapply',
      component: vacationapply
    },
    {
      path: '/examinelist',
      name: 'examinelist',
      component: examinelist
    },
    {
      path: '/applyprocess',
      name: 'applyprocess',
      component: applyprocess
    },
    {
      path: '/applydetail',
      name: 'applydetail',
      component: applydetail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
  ]
})
