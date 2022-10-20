<template>
  <div class="login-box">
    <!--登录表单-->
    <el-form label-width="120px" class="login-form">
      <h1 class="form-title">Login</h1>
      <!--用户名-->
      <el-input class="form-input" v-model="data.username" placeholder="username"></el-input>

      <!--密码-->
      <el-input class="form-input" v-model="data.password" type="password" placeholder="password"
                show-password></el-input>

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

      <el-button class="from-go" @click="toLogin">GO</el-button>
    </el-form>
    <!--底部区域-->
    <div class="footer">
      <a href="https://beian.miit.gov.cn/" target="_blank">浙ICP备2022014205号-1</a>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, reactive, toRefs, onBeforeMount, onBeforeUnmount} from "vue";
import {login, getCaptcha} from '@/api/login.js'
import store from "@/store/index.js";
import router from "@/router";
import {useMessage} from '@/hook/useMessage.js'

onBeforeMount(() => {
  document.body.style.backgroundImage = data.bgBackground.backgroundImage;
  document.body.style.backgroundRepeat = data.bgBackground.backgroundRepeat;
  document.body.style.backgroundSize = data.bgBackground.backgroundSize;
  document.body.style.backgroundPosition = data.bgBackground.backgroundPosition;
});
onBeforeUnmount(() => {
  document.body.removeAttribute("style");
});
const data = reactive({
  username: '',
  password: '',
  captcha: '',
  captchaImage: '',
  // 顶部导航背景图片配置
  bgBackground: {
    // 背景图片地址
    backgroundImage: 'url(' + require('../assets/img/bg.jpg') + ')',
    backgroundRepeat: "no-repeat",
    // 背景图片大小
    backgroundSize: 'cover',
    // 背景图片位置
    backgroundPosition: 'center top'

  }

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
.login-box {
  position: relative;
  margin: 0 auto;
  width: 1380px;
  height: 750px;
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -300px;
  text-align: center;
  border-radius: 8px;
  width: 600px;
  height: 300px;
  border: 1px solid #DCDFE6;
  /*边框阴影*/
  box-shadow: 15px 12px 17px #06c;

}


.form-title {
  margin: 20px auto;
  font-size: 40px;
}


.form-input {
  padding: 15px 150px 15px 150px;
}

.from-go {
  margin-top: 10px;
}


.footer {
  position: absolute;
  left: 50%;
  bottom: 0%;
  margin-left: -690px;
  width: 1380px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}
</style>
