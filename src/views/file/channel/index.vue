<template>
  <el-card class="box-card">
    <template #header>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件搬迁</el-breadcrumb-item>
        <el-breadcrumb-item>渠道管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <el-row class="mb-4">
      <el-button type="success" @click="data.insertDialogFlag=true">新增</el-button>
    </el-row>
    <!--table-->
    <el-table :data="data.logList" style="width: 100%">
      <el-table-column prop="channel" label="渠道" width="150px"/>
      <el-table-column prop="channelName" label="渠道名" width="100px"/>
      <el-table-column label="启用" width="100px">
        <template #default="scope">
          <el-switch v-model="scope.row.enable" class="ml-2"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     inline-prompt active-text="是" inactive-text="否"
                     @change="doEnableChannel(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="success" plain @click="handlePlatformConfig(scope.row)">平台配置</el-button>
          <el-button type="danger" plain @click="doDel(scope.row)">删除</el-button>
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
        @size-change="getChannels"
        @current-change="getChannels"
    />
  </el-card>

  <!--新增/修改弹窗-->
  <el-dialog v-model="data.insertDialogFlag" title="初始化渠道">
    <el-form :model="channelFormDate" label-width="120px" :rules="rules" ref="ruleFormRef">
      <el-form-item label="渠道code" prop="username">
        <el-input type="text" v-model="channelFormDate.channel" placeholder="请输入渠道CODE">
        </el-input>
      </el-form-item>
      <el-form-item label="渠道名" prop="realName">
        <el-input type="text" v-model="channelFormDate.channelName" placeholder="请输入渠道名">
        </el-input>
      </el-form-item>
    </el-form>
    <el-row justify="center">
      <el-button type="primary" @click="doInitChannel()">保存</el-button>
    </el-row>
  </el-dialog>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {getAllChannelList, enableChannel, initChannel, delChannel} from '@/api/file_disaptch/channelApi.js'
import type {FormInstance, FormRules} from 'element-plus'
import router from "@/router";

const data = reactive({
  logList: [],
  current: 1,
  size: 10,
  total: 0,

  insertDialogFlag: false,
})

const channelFormDate = reactive({
  channel: '',
  channelName: '',
})

/*初始化查询列表*/
onMounted(() => {
  getChannels();
})

/*
 * 初始化渠道
 */
const doInitChannel = async () => {
  const res = await initChannel(channelFormDate)
  data.insertDialogFlag = false;
  await getChannels();
}

/*查询日志列表*/
const getChannels = async () => {
  const params = {
    current: data.current,
    size: data.size
  }
  const res = await getAllChannelList(params)
  data.logList = res.data.content;
  data.total = res.data.total
}

const doEnableChannel = async (row) => {
  const params = {
    channel: row.channel,
    enable: row.enable,
  }
  const res = await enableChannel(params);
  await getChannels();
}

const doDel = async (row) => {
  const params = {
    channel: row.channel
  }
  const res = await delChannel(params);
  await getChannels();
}

const handlePlatformConfig = (row) => {
  // 跳转角色分配框
  router.push({
    name: 'filePlatform', params: {
      channel: row.channel,
      channelName: row.channelName,
    }
  })
}

/*校验规则*/
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  channel: [
    {required: true, message: '请输入渠道code', trigger: 'blur'}
  ],
  channelName: [
    {required: true, message: '请输入渠道名', trigger: 'blur'}
  ],
})

</script>

<style scoped>

</style>
