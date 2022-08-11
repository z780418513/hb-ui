<template>
  <div>
    <el-form label-width="120px" class="login-form">
      <h1 class="form-top">用户登录</h1>
      <!--用户名-->
      <el-form-item label="用户名">
        <el-col :span="18">
          <el-input v-model="username" placeholder="请输入用户名"></el-input>
        </el-col>
      </el-form-item>

      <!--密码-->
      <el-form-item label="密码">
        <el-col :span="18">
          <el-input v-model="password" type="password" placeholder="请输入密码" show-password></el-input>
        </el-col>
      </el-form-item>

      <el-button @click="toLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import {reactive, toRefs} from "vue";
import {login} from '@/api/login.js'

export default {
  name: "LoginView",
  setup() {
    const data = reactive({
      username: '',
      password: '',
    });

    // 登录请求
    const toLogin = async function () {
      const param = {
        username: data.username,
        password: data.password,
      }
      try {
        const res = login(param);
      } catch (err) {
        console.log(err)
      }
    }
    return {
      ...toRefs(data),
      toLogin
    };
  }
}
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
