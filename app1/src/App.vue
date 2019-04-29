<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
//import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
// import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    //HelloWorld,
  },
})
export default class App extends Vue {
 // locale: zhCN,
}
</script>

<style>
</style>
