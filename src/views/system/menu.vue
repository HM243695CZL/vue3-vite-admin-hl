<template>
  <div class="sys-menu-container h100">
    <el-button size="default" type="primary" @click="clickAdd">
      <el-icon>
        <ele-Plus />
      </el-icon>
      新增
    </el-button>
    <vxe-table
      border='inner'
      :data='dataList'
      align='left'
      :stripe='false'
      :tree-config='{
        rowField: "id"
      }'
    >
      <vxe-column field='title' title='菜单名称' tree-node />
      <vxe-column field="path" title="路由路径" />
      <vxe-column field="component" title="组件路径" />
      <vxe-column field="roles" title="权限标识" />
      <vxe-column field="sort" title="排序" />
      <vxe-column title="操作" width="200">
        <template #default="scope">
          <el-button size="small" type="default" @click="clickEdit(scope.row.id)">修改</el-button>
          <el-button size="small" type="danger" @click="clickDelete(scope.row.id)">删除</el-button>
        </template>
      </vxe-column>
    </vxe-table>
    <MenuModal
      ref="modalFormRef"
      :menu-list="dataList"
      @refreshList="getDataList"
    />
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, ref, toRefs} from 'vue';
import {getAction} from '/@/api/common';
import {deleteMenuApi, getMenuListApi} from '/@/api/system/menu';
import {StatusEnum} from '/@/common/status.enum';
import MenuModal from './component/menu/menuModal.vue';
import {ElMessage} from 'element-plus';

export default {
  name: 'sys-menu',
  components: {
    MenuModal
  },
  setup() {
    const modalFormRef = ref();
    const state = reactive({
      dataList: []
    });
    const getDataList = () => {
      getAction(getMenuListApi, '').then(res => {
        if (res.status === StatusEnum.SUCCESS) {
          state.dataList = res.data;
        }
      });
    };
    const clickAdd = () => {
      modalFormRef.value.openDialog();
    };
    const clickEdit = (row: any) => {
      modalFormRef.value.openDialog(row);
    };
    const clickDelete = (id: string) => {
      getAction(`${deleteMenuApi}/${id}`, '').then(res => {
        if (res.status === StatusEnum.SUCCESS) {
          ElMessage.success(res.message);
          getDataList();
        }
      });
    };
    onMounted(() => {
      getDataList();
    });
    return {
      modalFormRef,
      ...toRefs(state),
      clickAdd,
      getDataList,
      clickEdit,
      clickDelete
    }
  }
}
</script>

<style scoped lang="scss">
  .sys-menu-container{
    padding: 20px;
    overflow: auto;
  }
</style>
