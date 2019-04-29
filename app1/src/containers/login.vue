<template>
  <div class="login">
    <a-form
      :form="form"
      :class="login"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'code',
          { rules: [{ required: true, message: '输入用户code' }] }
        ]"
          placeholder="输入用户code"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: false, message: '输入密码' }] }
        ]"
          type="password"
          placeholder="输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

//const app = namespace('app')

@Component
export default class Login extends Vue {
  @Prop() form: any;
  @Action("login") login: any;

  mounted() {
    this.form = this.$form.createForm(this);
  }

  handleSubmit() {
    this.form.validateFields((err: any, values: any) => {
      console.log(err, values);
      if (!err) {
        this.login(values.code);
      }
    });
  }
}
</script>
<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .login-form-button {
      width: 100%;
  }
}
</style>


