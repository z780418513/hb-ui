<template>
  <div>
    <el-form label-width="120px" class="login-form">
      <h1 class="form-top">用户登录</h1>
      <!--用户名-->
      <el-form-item label="用户名">
        <el-col :span="18">
          <el-input v-model="data.username" placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item>

      <!--密码-->
      <el-form-item label="密码">
        <el-col :span="18">
          <el-input v-model="data.password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-col>
      </el-form-item>
      <!--      &lt;!&ndash;验证码&ndash;&gt;-->
      <!--      <el-form-item>-->
      <!--        <el-col :span="18">-->
      <!--          <el-image style="width: 100px; height: 30px" :src="data.captchaImage" @click="refreshCaptcha"/>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->
      <!--      <el-form-item label="验证码">-->
      <!--        <el-col :span="18">-->
      <!--          <el-input v-model="data.captcha" placeholder="请输入验证码"></el-input>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->

      <el-button @click="toLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs} from "vue";
import {login, getCaptcha} from '@/api/login.js'
import store from "@/store/index.js";
import router from "@/router";
import {useMessage} from '@/hook/useMessage.js'


const data = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaImage: ''
});

// 登录请求
const toLogin = async function () {
  await store.dispatch('loginAction', data);
  // 跳转到首页
  await router.push("/")

}


// 验证码
// onMounted(async () => {
//   await getCaptchaImage();
// })
// const getCaptchaImage = async function () {
//   const res = await getCaptcha();
//   data.captchaImage = res.data.image;
// }
// const refreshCaptcha = function () {
//   getCaptchaImage();
// }
</script>

<style scoped>
.login-form {
  border: 2px solid #DCDFE6;
  text-align: center;
  border-radius: 8px;
  margin: 100px auto;
  width: 500px;
}

.form-top {
  margin: 10px auto;
}
</style>
