<template>
  <el-card class="box-card">
    <!--form表单-->
    <el-form>
      <el-form-item>
        <el-button type="success" @click="handleInsert">新增</el-button>
      </el-form-item>
    </el-form>

    <!--table-->
    <el-table :data="data.roleList" style="width: 100%"
              row-key="id">
      <el-table-column prop="roleName" label="角色名称" width="200px"/>
      <el-table-column prop="description" label="角色描述" width="200px"/>
      <el-table-column label="状态" width="150px">
        <template #default="scope">
          <el-switch v-model="scope.row.isEnable" class="ml-2" width="50px"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     inline-prompt active-text="启用" inactive-text="禁用"
                     @change="updateEnableStatus(scope.row.id,scope.row.enable)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="warning" plain @click="handleDistributionUser(scope.row.id)">分配用户</el-button>
          <el-button type="warning" plain @click="handleUpdateMenu(scope.row.id)">分配权限</el-button>
          <el-button type="danger" plain @click="handleDeleteMenu(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import {getLoginUser} from '@/api/userApi'
import {getRoleList} from '@/api/roleApi'
import router from '@/router/index.ts'

/*初始化*/
onMounted(() => {
  // 获取登录用户名
  const user = getLoginUser();
  data.loginUserId = user.id;
  // 查询角色列表
  doGetRoleList()
})

const doGetRoleList = async () => {
  const res = await getRoleList()
  data.roleList = res.data
  console.log(res.data)
}

const handleDistributionUser = (roleId) => {
  // 跳转角色分配框
  router.push({path: '/role/2', params: {id: roleId}})
}

const data = reactive({
  // 当前用户id
  loginUserId: '',
  roleList: [],

})
</script>

<style scoped>

</style>
