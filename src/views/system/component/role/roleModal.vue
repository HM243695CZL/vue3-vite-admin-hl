<template>
  <div class="role-modal-container">
    <el-dialog :append-to-body='false'
               :close-on-click-modal='false'
               :title='title'
               v-model='isShowDialog' width='600px'>
      <el-form ref='formRef' :rules='state.rules' :model='ruleForm' label-width='100px'>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色key" prop="key">
          <el-input v-model="ruleForm.key" placeholder="请输入角色key" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色备注" prop="desc">
          <el-input v-model="ruleForm.desc" placeholder="请输入角色备注" clearable></el-input>
        </el-form-item>
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
  import {createRoleApi, updateRoleApi, viewRoleApi} from '/@/api/system/role';
  import useCrudModal from '/@/hooks/useCrudModal';

  const emits = defineEmits([
      'refreshList'
  ]);
  const formRef = ref();
  const state = reactive({
    rules: {
      name: [
        { required: true, message: '角色名称不能为空!', trigger: 'blur' }
      ],
      key: [
        { required: true, message: '角色key不能为空!', trigger: 'blur' }
      ]
    }
  });
  const refreshList = () => {
    emits('refreshList');
  };
  const {
    openDialog,
    closeDialog,
    clickConfirm,
    isShowDialog,
    title,
    ruleForm
  } = useCrudModal({
    formRef: formRef,
    createPath: createRoleApi,
    updatePath: updateRoleApi,
    viewPath: viewRoleApi,
    title: '角色',
    refreshList
  });
  defineExpose({
    openDialog
  });
</script>

<style scoped lang="scss">

</style>
