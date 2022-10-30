<template>
  <el-card class="box-card">
    <!--form表单-->
    <el-form>
      <el-form-item>
        <el-button type="success" @click="handleInsertMenu">新增</el-button>
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
          <el-switch v-model="scope.row.enable" class="ml-2" width="50px"
                     style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                     inline-prompt active-text="启用" inactive-text="禁用"
                     @change="updateEnableStatus(scope.row.id,scope.row.enable)"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="warning" plain @click="handleUpdateMenu(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.children.length ==0" type="danger" plain @click="handleDeleteMenu(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--新增修改弹出框-->
    <el-dialog
        v-model="data.dialogVisible"
        :title="data.dialogTitle"
        :before-close="handleClose"
    >
      <el-form :model="data.menuFrom" label-width="120px">
        <el-form-item label="上级菜单">
          <el-tree-select
              placeholder="请选择上级菜单"
              v-model="data.menuFrom.parentName"
              :data="data.menuList"
              :render-after-expand="false"
              :props="data.defaultProps"
              :check-strictly=true
              @node-click="handleNodeClick"/>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio-group v-model="data.menuFrom.nodeType">
            <el-radio :label="1" size="large">目录</el-radio>
            <el-radio :label="2" size="large">菜单</el-radio>
            <el-radio :label="3" size="large">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="data.menuFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="菜单图标">
          <el-input v-model="data.menuFrom.name"></el-input>
        </el-form-item>
        <el-form-item label="显示排序">
          <el-input v-model="data.menuFrom.sort"></el-input>
        </el-form-item>
        <el-form-item label="路由地址">
          <el-input v-model="data.menuFrom.linkUrl"></el-input>
        </el-form-item>
        <el-form-item label="菜单状态">
          <el-radio-group v-model="data.menuFrom.isEnable">
            <el-radio :label="true" size="large">正常</el-radio>
            <el-radio :label="false" size="large">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addOrUpdateMenu">确定</el-button>
      </span>
      </template>
    </el-dialog>

    <!--删除对话框-->
    <el-dialog v-model="data.deleteDialogVisible" title="删除菜单" width="30%">
    <span>
      删除后无法恢复，是否继续进行删除操作
    </span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="data.deleteDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="doDeleteMenu">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import {getLoginUser} from '@/api/userApi'
import {getMenusByUserId, addMenu, deleteMenu, getById, updateMenu, switchMenu} from "@/api/menuApi";


/*初始化*/
onMounted(() => {
  // 获取登录用户名
  const user = getLoginUser();
  data.loginUserId = user.id;
  // 查询用户菜单
  getUserMenu(data.loginUserId);

})


// 查询用户菜单
const getUserMenu = async (userId) => {
  const res = await getMenusByUserId(userId);
  data.menuList = res.data
}

// 选中上级菜单
const handleNodeClick = (res) => {
  data.menuFrom.parentName = res.name;
  data.menuFrom.parentId = res.id;
}

// 点击新增菜单
const handleInsertMenu = () => {
  data.dialogVisible = true;
  data.dialogTitle = '新增菜单';
  data.dialogFlag = '1';
  data.menuFrom.isEnable = true;
}
const handleUpdateMenu = async (id) => {
  data.dialogVisible = true;
  data.dialogTitle = '编辑菜单';
  data.dialogFlag = '2';
  const params = {
    id: id
  }
  const res = await getById(params)
  data.menuFrom.id = res.data.id
  data.menuFrom.parentId = res.data.parentId
  data.menuFrom.nodeType = res.data.nodeType
  data.menuFrom.name = res.data.name
  data.menuFrom.sort = res.data.sort
  data.menuFrom.iconUrl = res.data.iconUrl
  data.menuFrom.linkUrl = res.data.linkUrl
  data.menuFrom.isEnable = res.data.isEnable
  // 父菜单名
  const parentParams = {
    id: res.data.parentId
  }
  const parentRes = await getById(parentParams)
  data.menuFrom.parentName = parentRes.data.name

}
// 关闭修改菜单
const handleClose = () => {
  data.menuFrom.parentId = '';
  data.menuFrom.parentName = '';
  data.menuFrom.name = '';
  data.menuFrom.nodeType = '';
  data.menuFrom.id = '';
  data.menuFrom.sort = '';
  data.menuFrom.iconUrl = '';
  data.menuFrom.linkUrl = '';
  data.menuFrom.isEnable = true;
  data.dialogFlag = '';
  data.dialogVisible = false;

  // 查询用户菜单
  getUserMenu(data.loginUserId);
}
// 新增或修改
const addOrUpdateMenu = async () => {
  const params = {
    parentId: data.menuFrom.parentId,
    nodeType: data.menuFrom.nodeType,
    name: data.menuFrom.name,
    sort: data.menuFrom.sort,
    iconUrl: data.menuFrom.iconUrl,
    linkUrl: data.menuFrom.linkUrl,
    isEnable: data.menuFrom.isEnable,
  }
  if (data.dialogFlag == '2') {
    params['id'] = data.menuFrom.id;
    await updateMenu(params)
  } else {
    await addMenu(params);
  }
  // 清空
  handleClose();
}
// 开启关闭菜单
const updateEnableStatus = async (id, status) => {
  const body = {
    id: id,
    isEnable: status
  }
  await switchMenu(body)
  await getUserMenu(data.loginUserId);
}
const handleDeleteMenu = async (id) => {
  data.deleteDialogVisible = true;
  data.deletedId = id;
}
// 删除菜单
const doDeleteMenu = async () => {
  // 删除id
  await deleteMenu(data.deletedId)
  // 关闭弹出框
  data.deleteDialogVisible = false;
  data.deletedId = '';
  // 查询用户菜单
  await getUserMenu(data.loginUserId);
}

const data = reactive({
  // 当前用户id
  loginUserId: '',
  menuList: [],
  // 新增修改弹窗
  dialogVisible: false,
  //删除弹窗
  deleteDialogVisible: false,
  // 删除id
  deletedId: '',
  // 新增修改弹窗标题
  dialogTitle: '新增菜单',
  // 1=新增 2=修改
  dialogFlag: '',
  defaultProps: {
    children: 'children',
    label: 'name',
    value: 'id',
  },
  // 表单数据
  menuFrom: {
    id: '',
    // 上级菜单名
    parentName: '',
    parentId: '',
    nodeType: '',
    name: '',
    sort: '',
    iconUrl: '',
    linkUrl: '',
    isEnable: true,
  }

})
</script>

<style scoped>

</style>
