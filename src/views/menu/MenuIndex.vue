<template>
  <el-card class="box-card">
        <!--form表单-->
        <el-form>
          <el-form-item>
<!--            <p>菜单名称</p>-->
<!--            <el-input type="text" class="from-input" placeholder="请输入菜单名称" v-model="data.username" :clearable="true"/>-->
<!--            <el-button type="success" @click="getUsers">查询</el-button>-->
            <el-button type="success" @click="getUsers">新增</el-button>
          </el-form-item>
        </el-form>

    <!--table-->
    <el-table :data="data.menuList" style="width: 100%"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              row-key="id">
      <el-table-column prop="name" label="菜单名称" width="200px"/>
      <el-table-column prop="iconUrl" label="图标" width="150px">
        <template #default="scope">
          <el-icon>
            <!--动态渲染图标，正常使用v-html渲染会失败-->
            <component :is="scope.row.iconUrl"/>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="150px"/>
      <el-table-column prop="linkUrl" label="组件路径" width="200px"/>
      <el-table-column label="状态" width="150px">
        <template #default="scope">
          <el-switch v-model="scope.row.enable" class="ml-2"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     inline-prompt active-text="是" inactive-text="否"
                     @change="updateEnableStatus(scope.row.id,scope.row.enable)"/>
        </template>
      </el-table-column>
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
import {getLoginUser} from '@/api/userApi'
import {getMenusByUserId} from "@/api/menuApi";


/*初始化*/
onMounted(() => {
  // 获取登录用户名
  const user = getLoginUser();
  // 查询用户菜单
  getUserMenu(user.id);

})


// 查询用户菜单
const getUserMenu = async (userId) => {
  const res = await getMenusByUserId(userId);
  data.menuList = res.data
  console.log(data.menuList)
}


const data = reactive({
  menuList: []
})
</script>

<style scoped>

</style>
