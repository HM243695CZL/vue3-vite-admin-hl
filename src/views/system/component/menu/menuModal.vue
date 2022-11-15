<template>
  <div class="menu-modal-container">
    <el-dialog :append-to-body='false'
               :close-on-click-modal='false'
               :title='title'
               v-model='isShowDialog' width='800px'>
      <el-form ref='formRef' :rules='state.rules' :model='ruleForm' label-width='100px'>
        <el-row :gutter="35">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="上级菜单" prop='pid'>
              <el-tree-select
                  class='w100'
                  clearable
                  default-expand-all
                  v-model='ruleForm.pid'
                  :data='props.menuList'
                  :props='{children: "children", label: "title", value: "id"}'
                  check-strictly
              ></el-tree-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="菜单名称" prop='title'>
              <el-input v-model="ruleForm.title" placeholder="菜单名称" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="菜单地址" prop='path'>
              <el-input v-model="ruleForm.path" placeholder="菜单地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="路由名称" prop='name'>
              <el-input v-model="ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="组件地址" prop='component'>
              <el-input v-model="ruleForm.component" placeholder="组件地址" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="菜单图标" prop='icon'>
              <IconSelector placeholder="请输入菜单图标" v-model="ruleForm.icon" type="all" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="菜单排序" prop='sort'>
              <el-input v-model="ruleForm.sort" placeholder="请输入排序" class="w100" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="是否隐藏" prop='isHide'>
              <el-radio-group v-model="ruleForm.isHide">
                <el-radio :label="true">隐藏</el-radio>
                <el-radio :label="false">不隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="页面缓存" prop='isKeepAlive'>
              <el-radio-group v-model="ruleForm.isKeepAlive">
                <el-radio :label="true">缓存</el-radio>
                <el-radio :label="false">不缓存</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
            <el-form-item label="是否固定" prop='isAffix'>
              <el-radio-group v-model="ruleForm.isAffix">
                <el-radio :label="true">固定</el-radio>
                <el-radio :label="false">不固定</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class='dialog-footer'>
          <el-button @click='closeDialog'>取 消</el-button>
          <el-button type='primary' @click='clickConfirm'>确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import {reactive, ref} from 'vue';
  import IconSelector from '/@/components/iconSelector/index.vue';
  import {createMenuApi, updateMenuApi, viewMenuApi} from '/@/api/system/menu';
  import useCrudModal from '/@/hooks/useCrudModal';

  const props = defineProps({
    menuList: {
      type: Array,
      required: true
    }
  });
  const emits = defineEmits([
    'refreshList'
  ]);
  const formRef = ref();
  const state = reactive({
    rules: {
      path: [
        { required: true, message: '菜单地址不能为空', trigger: 'blur'}
      ],
      name: [
        { required: true, message: '组件名称不能为空', trigger: 'blur'}
      ],
      title: [
        { required: true, message: '菜单名称不能为空', trigger: 'blur'}
      ],
      component: [
        { required: true, message: '组件地址不能为空', trigger: 'blur'}
      ]
    },
    menuList: [] as any
  });
  const refreshList = () => {
    emits('refreshList');
  }
  const {
    openDialog,
    closeDialog,
    clickConfirm,
    isShowDialog,
    title,
    ruleForm
  } = useCrudModal({
    formRef,
    createPath: createMenuApi,
    updatePath: updateMenuApi,
    viewPath: viewMenuApi,
    title: '菜单',
    refreshList,
  });
  defineExpose({
    openDialog
  });
</script>

<style scoped lang="less">

</style>
