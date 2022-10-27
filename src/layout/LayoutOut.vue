<template>
  <el-container class="common-layout">

    <!--头部-->
    <el-header class="home-header">
      <el-row>
        <el-col :span="3">HB后台管理系统</el-col>
        <el-col :span="15"></el-col>
        <!--头像-->
        <el-col :span="1">
          <!--            <a href="#">个人信息</a>-->
          <el-avatar class="avatar-img" :size="45" :src="data.avatar" @click="modifyAvatar"/>
        </el-col>
        <!--        &lt;!&ndash;切换风格&ndash;&gt;-->
        <!--        <el-col :span="1">-->
        <!--          <el-switch-->
        <!--              v-model="data.themeStyle"-->
        <!--              inline-prompt-->
        <!--              :active-icon="data.white"-->
        <!--              :inactive-icon="data.dark"-->
        <!--          />-->
        <!--        </el-col>-->
        <el-col :span="3">
          <el-button type="primary" @click="doLoginOut">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!--侧边栏-->
      <el-aside class="home-side">

        <el-menu class="el-menu-vertical" default-active="/index" :router="true">
          <template v-for="menu in data.menuList " :key="menu.id">
            <!--一级菜单(有子菜单)-->
            <el-sub-menu v-if="menu.children.length != 0" :index="menu.linkUrl">
              <template #title>
                <el-icon>
                  <!--动态渲染图标，正常使用v-html渲染会失败-->
                  <component :is="menu.iconUrl"/>
                </el-icon>
                <span>{{ menu.name }} </span>
              </template>


              <!--二级菜单-->
              <el-menu-item v-for="menu2 in menu.children " :key="menu2.id" :index="menu2.linkUrl">
                <el-icon>
                  <component :is="menu2.iconUrl"/>
                </el-icon>
                {{ menu2.name }}
              </el-menu-item>


            </el-sub-menu>
            <!--一级菜单(无子菜单-->
            <el-menu-item v-else :index="menu.linkUrl">
              <el-icon>
                <component :is="menu.iconUrl"/>
              </el-icon>
              {{ menu.name }}
            </el-menu-item>


          </template>


        </el-menu>


      </el-aside>
      <el-main>
        <!--主体区域-->
        <router-view></router-view>
      </el-main>
    </el-container>

    <!--修改头像-->
    <el-dialog v-model="data.modifyAvatarFlag"
               title="修改用户头像"
               custom-class="avatar-dialog"
               :close-on-click-modal="false">
      <!--上传头像-->
      <el-upload class="upload-Avatar"
                 :action="uploadAvatarUrl"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :http-request="upLoad"
                 :before-upload="beforeAvatarUpload">

        <img v-if="data.avatar" :src="data.avatar" class="avatar"/>
        <el-icon v-else class="avatar-uploader-icon">
          <Plus/>
        </el-icon>
      </el-upload>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" setup>
import store from "@/store/index.js";
import router from "@/router";
import {onMounted, reactive} from "vue";
import {useMessage} from '@/hook/useMessage'
import type {UploadProps} from 'element-plus'
import {getLoginUser, getUserInfo, uploadAvatar} from '@/api/userApi'
import {getMenusByUserId} from '@/api/menuApi.js'

const ElMessage = useMessage();

/*初始化*/
onMounted(() => {
  // 获取登录用户名
  const user = getLoginUser();
  // 查询用户信息
  getUserInfoByName(user.username);
  // 查询用户菜单
  getUserMenu(user.id);
})

const getUserInfoByName = async (username) => {
  const params = {
    username: username,
  }
  const res = await getUserInfo(params);
  data.userId = res.data.id;
  data.avatar = res.data.avatar;
}

// 查询用户菜单
const getUserMenu = async (userId) => {
  const res = await getMenusByUserId(userId);
  data.menuList = res.data
}
/*退出登录*/
const doLoginOut = async () => {
  const res = await store.dispatch('loginOutAction');
  // 跳转到首页
  await router.push("/login")
}

/*用户头像*/
const modifyAvatar = async () => {
  data.modifyAvatarFlag = true;
}
/*头像上传请求地址*/
const uploadAvatarUrl = process.env.VUE_APP_URL + '/user/uploadAvatar';
/*头像上传前校验*/
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const upLoad = async (file) => {
  //从组件传递过来的file对象已经获取到，只需要按照自己希望的格式传给后端就行。此处执行自己的处理逻辑
  const fileObj = file.file
  const form = new FormData()
  form.append('file', fileObj)
  form.append('id', data.userId)
  const res = await uploadAvatar(form)
  data.avatar = res.data;
  // 关闭窗口
  data.modifyAvatarFlag = false;
}


const data = reactive({
  modifyAvatarFlag: false,
  // 头像
  avatar: '',
  // 用户id
  userId: '',
  themeStyle: '',
  white: '',
  dark: '',
  menuList: []
})

</script>

<style scoped>
el-container {
  height: 100%;
  overflow: hidden;
}

.home-header {
  font-size: 14px;
  line-height: 60px;
  height: 60px;
  text-align: center;
  background-color: white;
  border: 1px solid rgb(231, 230, 231);
}

.el-col {
  height: 60px;
}

.avatar-img {
  margin-top: 8px;
  display: block;
  text-align: center;
  line-height: 60px;
}

.home-side {
  height: 100%;
  width: 200px;
}

.el-menu-vertical {
  height: 600px;
  width: 200px;
}

:deep(.avatar-dialog) {
  width: 270px;
}

.avatar {
  width: 200px;
  height: 200px;
  padding-left: 15px;
}

.icon {
  padding-right: 10px;
  font-size: 25px;
}
</style>
