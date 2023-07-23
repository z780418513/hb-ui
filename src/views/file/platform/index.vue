<template>
  <el-card class="box-card">
    <template #header>
      <!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文件搬迁</el-breadcrumb-item>
        <el-breadcrumb-item>平台管理</el-breadcrumb-item>
      </el-breadcrumb>
    </template>
    <!--描述 -->
    <el-descriptions title="渠道">
      <el-descriptions-item label="channel">{{ data.channel }}</el-descriptions-item>
      <el-descriptions-item label="channelName">{{ data.channelName }}</el-descriptions-item>
    </el-descriptions>

    <el-row class="mb-4">
      <el-button type="success" @click="data.diaFlag=true">新增</el-button>
    </el-row>
    <!--table-->
    <el-table :data="data.platformList" style="width: 100%">
      <el-table-column prop="channel" label="渠道" width="150px"/>
      <el-table-column prop="platform" label="平台" width="100px" :formatter="stateFormat"/>
      <el-table-column prop="platformName" label="平台名" width="100px" />
      <el-table-column prop="platformId" label="平台id" width="200px"/>
      <el-table-column prop="createTime" label="创建时间"/>
      <el-table-column label="操作">
        <template #default="scope">
          <!--          <el-button type="success" plain @click="doDisable(scope.row)">删除</el-button>-->
          <!--          <el-button type="danger" plain @click="doDisable(scope.row)">删除</el-button>-->
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
        @size-change="doQueryPageByChannel"
        @current-change="doQueryPageByChannel"
    />
  </el-card>

  <!--新增/修改弹窗-->
  <el-dialog v-model="data.diaFlag" title="新增平台配置">
    <el-form :model="platformDate" label-width="120px" ref="ruleFormRef">
      <el-form-item label="平台选择">
        <el-select v-model="platformDate.platform" :value-key="platformDate.platform +''" placeholder="请选择平台"
                   @change="showPlatformConfig()">
          <el-option
              v-for="item in platformOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="平台名" prop="platformName">
        <el-input type="text" v-model="platformDate.platformName" placeholder="请输入平台名">
        </el-input>
      </el-form-item>

      <!-- obs -->
      <el-form-item label="accessKey" prop="accessKey" v-if="platformDate.platform ==1">
        <el-input type="text" v-model="platformDate.obsConfig.accessKey" placeholder="请输入accessKey">
        </el-input>
      </el-form-item>
      <el-form-item label="secretKey" prop="secretKey" v-if="platformDate.platform ==1">
        <el-input type="text" v-model="platformDate.obsConfig.secretKey" placeholder="请输入secretKey">
        </el-input>
      </el-form-item>
      <el-form-item label="endPoint" prop="endPoint" v-if="platformDate.platform ==1">
        <el-input type="text" v-model="platformDate.obsConfig.endPoint" placeholder="请输入endPoint">
        </el-input>
      </el-form-item>
      <el-form-item label="bucket" prop="bucket" v-if="platformDate.platform ==1">
        <el-input type="text" v-model="platformDate.obsConfig.bucket" placeholder="请输入bucket">
        </el-input>
      </el-form-item>

      <!-- oss -->
      <el-form-item label="accessKeyId" prop="accessKeyId" v-if="platformDate.platform ==2">
        <el-input type="text" v-model="platformDate.ossConfig.accessKeyId" placeholder="请输入accessKeyId">
        </el-input>
      </el-form-item>
      <el-form-item label="accessKeySecret" prop="accessKeySecret" v-if="platformDate.platform ==2">
        <el-input type="text" v-model="platformDate.ossConfig.accessKeySecret" placeholder="请输入accessKeySecret">
        </el-input>
      </el-form-item>
      <el-form-item label="endpoint" prop="endpoint" v-if="platformDate.platform ==2">
        <el-input type="text" v-model="platformDate.ossConfig.endpoint" placeholder="请输入endpoint">
        </el-input>
      </el-form-item>
      <el-form-item label="bucketName" prop="bucketName" v-if="platformDate.platform ==2">
        <el-input type="text" v-model="platformDate.ossConfig.bucketName" placeholder="请输入bucketName">
        </el-input>
      </el-form-item>

      <!-- ftp -->
      <el-form-item label="host" prop="host" v-if="platformDate.platform ==3">
        <el-input type="text" v-model="platformDate.ftpConfig.host" placeholder="请输入host">
        </el-input>
      </el-form-item>
      <el-form-item label="port" prop="port" v-if="platformDate.platform ==3">
        <el-input type="text" v-model="platformDate.ftpConfig.port" placeholder="请输入port">
        </el-input>
      </el-form-item>
      <el-form-item label="username" prop="username" v-if="platformDate.platform ==3">
        <el-input type="text" v-model="platformDate.ftpConfig.username" placeholder="请输入username">
        </el-input>
      </el-form-item>
      <el-form-item label="password" prop="password" v-if="platformDate.platform ==3">
        <el-input type="text" v-model="platformDate.ftpConfig.password" placeholder="请输入password">
        </el-input>
      </el-form-item>

      <!-- minio -->
      <el-form-item label="endpoint" prop="endpoint" v-if="platformDate.platform ==4">
        <el-input type="text" v-model="platformDate.minioConfig.endpoint" placeholder="请输入endpoint">
        </el-input>
      </el-form-item>
      <el-form-item label="accessKey" prop="accessKey" v-if="platformDate.platform ==4">
        <el-input type="text" v-model="platformDate.minioConfig.accessKey" placeholder="请输入accessKey">
        </el-input>
      </el-form-item>
      <el-form-item label="secretKey" prop="secretKey" v-if="platformDate.platform ==4">
        <el-input type="text" v-model="platformDate.minioConfig.secretKey" placeholder="请输入secretKey">
        </el-input>
      </el-form-item>
      <el-form-item label="bucketName" prop="bucketName" v-if="platformDate.platform ==4">
        <el-input type="text" v-model="platformDate.minioConfig.bucketName" placeholder="请输入bucketName">
        </el-input>
      </el-form-item>


    </el-form>
    <el-row justify="center">
      <el-button type="primary" @click="doAddPlatformConfig()">保存</el-button>
    </el-row>
  </el-dialog>

</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {useRoute} from 'vue-router'
import {
  queryPageByChannel,
  addObsConfig,
  addOssConfig,
  addFtpConfig,
  addMinioConfig
} from '@/api/file_disaptch/platformApi.js'
import type {FormInstance, FormRules} from 'element-plus'

const data = reactive({
  channel: '',
  channelName: '',
  platformList: [],
  current: 1,
  size: 10,
  total: 0,

  diaFlag: false,
})

const platformOption = reactive([
  {
    value: 1,
    label: '华为OBS',
  },
  {
    value: 2,
    label: '阿里OSS',
  },
  {
    value: 3,
    label: 'FTP',
  },
  {
    value: 4,
    label: 'MinIo',
  }
])

const platformDate = reactive({
  channel: "",
  platform: 1,
  platformName: '',
  obsConfig: {
    channel: "",
    platformName: '',
    accessKey: '',
    secretKey: '',
    endPoint: '',
    bucket: ''
  },
  ossConfig: {
    channel: "",
    platformName: '',
    endpoint: '',
    accessKeyId: '',
    accessKeySecret: '',
    bucketName: '',
  },
  ftpConfig: {
    channel: "",
    platformName: '',
    host: '',
    port: 21,
    username: '',
    password: ''
  },
  minioConfig: {
    channel: "",
    platformName: '',
    endpoint: '',
    accessKey: '',
    secretKey: '',
    bucketName: '',
  }
})

const showPlatformConfig = () => {
  console.log(platformDate)
}


/*初始化查询列表*/
onMounted(() => {
  const route = useRoute();
  let params = route.params;
  data.channel = params.channel + '';
  data.channelName = params.channelName + '';

  doQueryPageByChannel();
})


/*查询日志列表*/
const doQueryPageByChannel = async () => {
  const params = {
    channel: data.channel,
    current: data.current,
    size: data.size
  }
  const res = await queryPageByChannel(params)
  data.platformList = res.data.content;
  data.total = res.data.total
}

const doAddPlatformConfig = async () => {
  let params = {};
  /*obs*/
  if (platformDate.platform == 1) {
    platformDate.obsConfig.channel = data.channel;
    platformDate.obsConfig.platformName = platformDate.platformName;
    await addObsConfig(platformDate.obsConfig)
  } else if (platformDate.platform == 2) {
    platformDate.ossConfig.channel = data.channel;
    platformDate.obsConfig.platformName = platformDate.platformName;
    await addOssConfig(platformDate.ossConfig)
  } else if (platformDate.platform == 3) {
    platformDate.ftpConfig.channel = data.channel;
    platformDate.obsConfig.platformName = platformDate.platformName;
    await addFtpConfig(platformDate.ftpConfig)
  } else if (platformDate.platform == 4) {
    platformDate.minioConfig.channel = data.channel;
    platformDate.obsConfig.platformName = platformDate.platformName;
    await addMinioConfig(platformDate.minioConfig)
  }
  data.diaFlag = false
  await doQueryPageByChannel()
}

const stateFormat = (platformData) => {
  if (platformData.platform != null && platformData.platform != "" && platformData.platform == 1) {
    return "华为OBS";
  } else if (platformData.platform != null && platformData.platform != "" && platformData.platform == 2) {
    return "阿里OSS";
  }else if (platformData.platform != null && platformData.platform != "" && platformData.platform == 3) {
    return "FTP";
  }else if (platformData.platform != null && platformData.platform != "" && platformData.platform == 4) {
    return "MINIO";
  }
}


</script>

<style scoped>

</style>
