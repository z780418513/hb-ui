<template>
  <el-card class="box-card">
    <template #header>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <!--form表单-->
    <el-form>
      <el-form-item>
        <!--用户名-->
        <p>用户名:</p>
        <el-input type="text" class="from-input" placeholder="用户名" v-model="data.username" :clearable="true"/>
        <!--关键字-->
        <p>关键字:</p>
        <el-input type="text" class="from-input" placeholder="姓名或手机号" v-model="data.keyword" :clearable="true"/>
        <!--新增按钮-->
        <el-button type="success" @click="getUsers">查询</el-button>
        <!--新增按钮-->
        <el-button type="primary" @click="doInsertUser">新增用户</el-button>
      </el-form-item>
    </el-form>

    <!--table-->
    <el-table :data="data.userList" style="width: 100%">
      <el-table-column prop="username" label="用户名" width="150px"/>
      <el-table-column prop="realName" label="姓名" width="100px"/>
      <el-table-column prop="nickName" label="昵称" width="100px"/>
      <el-table-column prop="mobile" label="手机号" width="100px"/>
      <el-table-column prop="email" label="邮箱" width="100px"/>
      <el-table-column label="启用" width="100px">
        <template #default="scope">
          <el-switch v-model="scope.row.enable" class="ml-2"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     inline-prompt active-text="是" inactive-text="否"
                     @change="updateEnableStatus(scope.row.id,scope.row.enable)"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="warning" plain @click="doUpdateUser(scope.row)">编辑</el-button>
          <el-button type="danger" plain @click="doDelUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
        v-model:currentPage="data.current"
        v-model:page-size="data.size"
        :page-sizes="[10, 30, 50, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="getUsers"
        @current-change="getUsers"
    />

    <!--新增/修改弹窗-->
    <el-dialog v-model="data.insertDialogFlag" :title="data.fromTitle">
      <el-form :model="userFromDate" label-width="120px" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="userFromDate.username" placeholder="请输入用户名"
                    :disabled="data.disabled"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input type="text" v-model="userFromDate.realName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName">
          <el-input type="text" v-model="userFromDate.nickName" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="userFromDate.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="text" v-model="userFromDate.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
      </el-form>
      <el-row justify="center">
        <el-button type="primary" @click="insertOrUpdateUser(ruleFormRef)">保存</el-button>
      </el-row>
    </el-dialog>

    <!--删除弹出框-->
    <el-dialog
        v-model="data.delDialogVisible" title="删除用户？" width="30%">
      <span>是否删除该用户？删除后将无法正常使用该账号</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.delDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="delUser">确认</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {getUserList, addUser, updateUser, deleteUser} from '@/api/userApi.js'
import type {FormInstance, FormRules} from 'element-plus'


const data = reactive({
  username: '',
  keyword: '',
  current: 1,
  size: 10,
  total: 1,
  userList: [],
  // 新增Dialog标识
  insertDialogFlag: false,
  // 删除Dialog标识
  delDialogVisible: false,
  fromStatus: 1,
  fromTitle: "",
  disabled: true
})

/*初始化查询列表*/
onMounted(() => {
  getUsers();
})

/*查询用户列表*/
const getUsers = async () => {
  const params = {
    username: data.username,
    keyword: data.keyword,
    current: data.current,
    size: data.size
  }
  const res = await getUserList(params)
  data.userList = res.data.content;
  data.total = res.data.total
}


/*新增/修改表单数据*/
const userFromDate = reactive({
  id: '',
  username: '',
  realName: '',
  nickName: '',
  mobile: '',
  email: '',
  enable: '',
})
/*新增用户*/
const doInsertUser = () => {
  data.fromStatus = 1;
  data.fromTitle = '新增用户'
  data.insertDialogFlag = true;
  data.disabled = false;
  userFromDate.username = '';
  userFromDate.realName = '';
  userFromDate.nickName = '';
  userFromDate.mobile = '';
  userFromDate.email = '';
}
/*修改用户*/
const doUpdateUser = (row) => {
  data.fromStatus = 2;
  data.fromTitle = '修改用户'
  data.insertDialogFlag = true;
  data.disabled = true;
  userFromDate.username = row.username;
  userFromDate.realName = row.realName;
  userFromDate.nickName = row.nickName;
  userFromDate.mobile = row.mobile;
  userFromDate.email = row.email;
  userFromDate.enable = row.enable;
  userFromDate.id = row.id;
}

/*新增或保存保存*/
const insertOrUpdateUser = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    // 校验成功
    if (valid) {
      // 新增
      let res;
      if (data.fromStatus == 1) {
        res = await addUser(userFromDate);
      } else { // 修改
        res = await updateUser(userFromDate.id, userFromDate);
      }
      if (res.code == process.env.VUE_APP_RESULT_SUCCESS) {
        data.insertDialogFlag = false;
        await getUsers()
      }
    } else {
      // 校验失败 。。。。
    }
  })

}


/*修改用户状态*/
const updateEnableStatus = async (id, enable) => {
  const params = {
    "enable": enable
  }
  const res = await updateUser(id, params);
  if (res.code == process.env.VUE_APP_RESULT_SUCCESS) {
    getUsers()
  }
}


/*校验规则*/
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'}
  ],
  email: [
    {
      required: false,
      pattern: /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
      message: '请输入正确的邮箱号',
      trigger: 'blur'
    }
  ], mobile: [
    {
      required: false,
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ]
})


/*删除弹窗*/
const doDelUser = (id) => {
  data.delDialogVisible = true;
  userFromDate.id = id;
}
// 删除用户
const delUser = async () => {
  const res = await deleteUser(userFromDate.id)
  data.delDialogVisible = false;
  await getUsers()
}


</script>

<style scoped>
.from-input {
  width: 200px;
  padding-right: 15px;
  padding-left: 15px;
}


</style>
