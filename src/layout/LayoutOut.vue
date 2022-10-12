<template>
  <div class="common-layout">

    <el-container>
      <!--头部-->
      <el-header class="home-header">
        <el-row>
          <el-col :span="18">HB后台管理系统</el-col>
          <el-col :span="3">
<!--            <a href="#">个人信息</a>-->
            <el-avatar :size="50" :src="avatar" @click="modifyAvatar" />
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="doLoginOut">退出登录</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <!--侧边栏-->
        <el-aside class="home-side">
          <el-menu class="el-menu-vertical" default-active="/index" :router="true">
            <el-sub-menu index="1">
              <template #title>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yonghu"></use>
                </svg>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-yewujiaose"></use>
                </svg>
                <span>角色管理</span>
              </template>
              <el-menu-item index="/role/list">角色列表</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhuanxierizhi"></use>
                </svg>
                <span>日志管理</span>
              </template>
              <el-menu-item index="/log/list">历史日志</el-menu-item>
            </el-sub-menu>


          </el-menu>


        </el-aside>
        <el-main>
          <!--主体区域-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog
        v-model="modifyAvatar"
        title="修改用户头像"
        width="400px"
    >
      <el-upload
          class="upload-demo"
          drag
          action="http://localhost:1026/user/uploadAvatar"
          multiple
          data="modifyAvatarData"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store/index.js";
import router from "@/router";


/*退出登录*/
const doLoginOut = async () => {
  const res = await store.dispatch('loginOutAction');
  // 跳转到首页
  await router.push("/login")
}

const avatar = 'https://hb-admin-oss.oss-cn-hangzhou.aliyuncs.com/2022/10/08/45691342-a4cc-413a-b597-93c838ff413f-bg.jpeg'
const modifyAvatar = true;
const modifyAvatarData = {
  'id':'1'
}



</script>

<style scoped>
el-container {
  height: 100%;
  overflow: hidden;
}

.home-header {
  font-size: 14px;
  line-height: 50px;
  height: 50px;
}

.home-side {
  height: 100%;
}

.el-menu-vertical {
  height: 600px;
}

.icon {
  padding-right: 10px;
  font-size: 25px;
}
</style>
