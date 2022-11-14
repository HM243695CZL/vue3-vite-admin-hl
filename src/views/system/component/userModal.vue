<template>
  <div class="user-modal-container">
    <el-dialog :append-to-body='false'
               :close-on-click-modal='false'
               :title='state.title'
               v-model='state.isShowDialog' width='600px'>
      <el-form ref='formRef' :rules='state.rules' :model='state.ruleForm' label-width='100px'>
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="state.ruleForm.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="关联角色" prop="roleIds">
          <el-input v-model="state.ruleForm.roleIds" placeholder="请输入关联角色"></el-input>
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
  import {nextTick, reactive, ref} from 'vue';

  const formRef = ref();
  const state = reactive({
    isShowDialog: false,
    title: '',
    ruleForm: {
      id: '',
      username: '',
      roleIds: []
    },
    rules: {
      username: [
        { required: true, message: '用户名称不能为空', trigger: 'blur'}
      ]
    }
  });
  const closeDialog = () => {
    state.isShowDialog = false;
  };
  const openDialog = (row: any) => {
    state.isShowDialog = true;
    state.ruleForm.id = '';
    nextTick(() => {
      formRef.value.resetFields();
      if (row) {
        state.title = '修改用户';
      } else {
        state.title = '新增用户';
      }
    })
  };
  const clickConfirm = () => {

  };
  defineExpose({
    openDialog
  });
</script>

<style scoped lang="scss">

</style>
