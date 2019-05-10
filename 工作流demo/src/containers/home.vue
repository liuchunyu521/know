<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <div class="logo" />
      <div class="company">用友政务业务系统</div>
      <div class="actions" ><a-icon type="logout" @click="logout"></a-icon></div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />首页</span>
            <a-menu-item key="1">
              <router-link to="/payment/list">资金支付单据</router-link>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
        
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  mounted() {
      this.$router.push('/payment/list');
  },
  data () {
    return {
      collapsed: false,
    }
  },

  methods: {
     logout: function(){
        sessionStorage.clear();
        this.$router.push('/login');
     }
  }
}
</script>

<style>
</style>