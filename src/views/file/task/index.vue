<template>
  <el-card class="box-card">
    <template #header>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件搬迁</el-breadcrumb-item>
        <el-breadcrumb-item>任务管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>

    <!--form表单-->
    <el-form>
      <el-form-item>
        <p>渠道:</p>
        <el-select v-model="data.channel" placeholder="请选择">
          <el-option
              v-for="item in data.channelList"
              :key="item.id"
              :label="item.channelName"
              :value="item.channel"
          />
        </el-select>
        <p>状态:</p>
        <el-select v-model="data.status" placeholder="请选择">
          <el-option
              v-for="item in statusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <!--查询按钮-->
        <el-button type="success" @click="doQueryDispatchTask">查询</el-button>
        <!--新增按钮-->
        <el-button type="primary" @click="data.diaFlag=true">新增任务</el-button>
      </el-form-item>
    </el-form>

    <!--table-->
    <el-table :data="data.taskList" style="width: 100%">
      <el-table-column prop="channel" label="渠道" width="100px"/>
      <el-table-column prop="inputPlatformId" label="输入平台id" width="100px"/>
      <el-table-column prop="outputPlatformId" label="输出平台id" width="100px"/>
      <el-table-column prop="status" label="状态" width="100px" :formatter="stateFormat"/>
      <el-table-column prop="message" label="任务message" width="100px"/>
      <el-table-column prop="sourceUrl" label="原地址" width="100px"/>
      <el-table-column prop="uploadDir" label="上传后地址" width="100px"/>
      <el-table-column prop="forcedInjection" label="是否强制注入" width="100px"/>
      <el-table-column prop="createTime" label="创建时间"/>

    </el-table>
    <!--分页-->
    <el-pagination
        v-model:currentPage="data.current"
        v-model:page-size="data.size"
        :page-sizes="[10, 30, 50, 100]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.total"
        @size-change="doQueryDispatchTask"
        @current-change="doQueryDispatchTask"
    />

    <!--新增/修改弹窗-->
    <el-dialog v-model="data.diaFlag" :title="data.fromTitle">
      <el-form :model="taskFromDate" label-width="120px" ref="ruleFormRef">
        <el-form-item label="渠道" prop="channel">
          <el-select v-model="taskFromDate.channel" placeholder="请选择" @change="doQueryListByChannel">
            <el-option
                v-for="item in data.channelList"
                :key="item.id"
                :label="item.channelName"
                :value="item.channel"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="输入平台" prop="inputPlatformId">
          <el-select v-model="taskFromDate.inputPlatformId" placeholder="请选择">
            <el-option
                v-for="item in data.platformList"
                :key="item.id"
                :label="item.platformName"
                :value="item.platformId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="输出平台" prop="outputPlatformId">
          <el-select v-model="taskFromDate.outputPlatformId" placeholder="请选择">
            <el-option
                v-for="item in data.platformList"
                :key="item.id"
                :label="item.platformName"
                :value="item.platformId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="源文件路径" prop="sourceUrl">
          <el-input type="text" v-model="taskFromDate.sourceUrl" placeholder="请输入源文件路径"></el-input>
        </el-form-item>
        <el-form-item label="搬迁路径" prop="uploadDir">
          <el-input type="text" v-model="taskFromDate.uploadDir" placeholder="请输入搬迁路径"></el-input>
        </el-form-item>
        <el-form-item label="强制注入" prop="forcedInjection">
          <el-switch
              v-model="taskFromDate.forcedInjection"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
          />
        </el-form-item>
      </el-form>
      <el-row justify="center">
        <el-button type="primary" @click="insertOrUpdateTask()">保存</el-button>
      </el-row>
    </el-dialog>


  </el-card>


</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {queryDispatchTask, addTask} from '@/api/file_disaptch/taskApi.js'
import {getChannelList} from '@/api/file_disaptch/channelApi.js'
import {queryListByChannel} from '@/api/file_disaptch/platformApi.js'


const data = reactive({
  channel: '',
  status: null,

  channelList: [],
  platformList: [],
  taskList: [],

  current: 1,
  size: 10,
  total: 0,

  diaFlag: false,
  fromTitle: '新增任务'
})

const taskFromDate = reactive({
  channel: '',
  inputPlatformId: '',
  outputPlatformId: '',
  sourceUrl: '',
  uploadDir: '',
  forcedInjection: false,
})

const statusOption = [
  {
    label: "待处理",
    value: 1,
  }, {
    label: "处理中",
    value: 9,
  }, {
    label: "成功",
    value: 2,
  }, {
    label: "失败",
    value: 3,
  }
]

/*初始化查询列表*/
onMounted(() => {
  doGetChannelList();
})

/*查询渠道列表*/
const doGetChannelList = async () => {
  const res = await getChannelList()
  data.channelList = res.data;
}


const doQueryDispatchTask = async () => {
  const params = {
    channel: data.channel,
    status: data.status,
    current: data.current,
    size: data.size,
  }
  const res = await queryDispatchTask(params);
  data.taskList = res.data.content
  data.total = res.data.size
}

const doQueryListByChannel = async () => {
  const params = {
    channel: taskFromDate.channel,
  }
  const res = await queryListByChannel(params)
  data.platformList = res.data
  console.log(res.data)
}

const insertOrUpdateTask = async () => {
  const res = await addTask(taskFromDate);
  data.diaFlag = false;
}

const stateFormat = (taskData) => {
  if (taskData.status != null && taskData.status != "" && taskData.status == 1) {
    return "待处理";
  } else if (taskData.status != null && taskData.status != "" && taskData.status == 9) {
    return "进行中";
  }else if (taskData.status != null && taskData.status != "" && taskData.status == 2) {
    return "成功";
  }else if (taskData.status != null && taskData.status != "" && taskData.status == 3) {
    return "失败";
  }
}

</script>

<style scoped>
.from-input {
  width: 200px;
  padding-right: 15px;
  padding-left: 15px;
}


</style>
