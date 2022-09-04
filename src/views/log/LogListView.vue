<template>
  <el-card class="box-card">
    <template #header>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        <el-breadcrumb-item>日志列表</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <!--    &lt;!&ndash;form表单&ndash;&gt;-->
    <!--    <el-form>-->
    <!--      <el-form-item>-->
    <!--        &lt;!&ndash;用户名&ndash;&gt;-->
    <!--        <p>用户名:</p>-->
    <!--        <el-input type="text" class="from-input" placeholder="用户名" v-model="data.username" :clearable="true"/>-->
    <!--        &lt;!&ndash;关键字&ndash;&gt;-->
    <!--        <p>关键字:</p>-->
    <!--        <el-input type="text" class="from-input" placeholder="姓名或手机号" v-model="data.keyword" :clearable="true"/>-->
    <!--        &lt;!&ndash;新增按钮&ndash;&gt;-->
    <!--        <el-button type="success" @click="getUsers">查询</el-button>-->
    <!--        &lt;!&ndash;新增按钮&ndash;&gt;-->
    <!--        <el-button type="primary" @click="doInsertUser">新增用户</el-button>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->

    <!--table-->
    <el-table :data="data.logList" style="width: 100%">
      <el-table-column prop="module" label="模块" width="150px"/>
      <el-table-column prop="businessType" label="业务类型" width="100px"/>
      <el-table-column prop="method" label="方法名" width="100px"/>
      <el-table-column prop="requestMethod" label="请求方式" width="100px"/>
      <el-table-column prop="operatorType" label="操作类型" width="100px"/>
      <el-table-column prop="operatorIp" label="IP地址" width="100px"/>
<!--      <el-table-column label="启用" width="100px">-->
<!--        <template #default="scope">-->
<!--          <el-switch v-model="scope.row.enable" class="ml-2"-->
<!--                     style="&#45;&#45;el-switch-on-color: #13ce66; &#45;&#45;el-switch-off-color: #ff4949"-->
<!--                     inline-prompt active-text="是" inactive-text="否"-->
<!--                     @change="updateEnableStatus(scope.row.id,scope.row.enable)"/>-->
<!--        </template>-->
<!--      </el-table-column>-->
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
  </el-card>


</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import {getLogList} from '@/api/log.js'

const data = reactive({
  logList: [],
  current: 1,
  size: 10,
  total: ''
})

/*初始化查询列表*/
onMounted(() => {
  getLogs();
})

/*查询日志列表*/
const getLogs = async () => {
  const params = {
    current: data.current,
    size: data.size
  }
  const res = await getLogList(params)
  data.logList = res.data.content;
  data.total = res.data.total
}

</script>

<style scoped>

</style>
