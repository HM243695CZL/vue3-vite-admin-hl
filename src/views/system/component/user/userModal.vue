<template>
  <div class="user-modal-container">
    <el-dialog :append-to-body='false'
               :close-on-click-modal='false'
               :title='title'
               v-model='isShowDialog' width='600px'>
      <el-form ref='formRef' :rules='state.rules' :model='ruleForm' label-width='100px'>
        <el-form-item label="用户名称" prop="username">
					<el-input v-model="ruleForm.username" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="关联角色" prop="roleIds">
          <el-select v-model="ruleForm.roleIds" clearable multiple class="w100">
            <el-option v-for="item in props.roleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像" prop='avatar'>
          <SingleUpload :source-url="state.otherForm.avatar" @change-source-url="changeAvatar" />
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
  import useCrudModal from '/@/hooks/useCrudModal';
  import SingleUpload from '/@/components/Upload/SingleUpload.vue';
  import {createUserApi, updateUserApi, viewUserApi} from '/@/api/system/user';

  const props = defineProps({
    roleList: {
      type: Array,
      required: true
    }
  });
  const emits = defineEmits([
    'refreshList'
  ]);
  const formRef = ref();
  const state = reactive({
		otherForm: {
			avatar: ''
		},
    rules: {
      username: [
        { required: true, message: '用户名称不能为空', trigger: 'blur'}
      ]
    }
  });
  const refreshList = () => {
    emits('refreshList');
  };
	const otherInitMethod = (dataMap: any) => {
		for (const o in state.otherForm) {
			state.otherForm[o] = dataMap ? dataMap[o] : null;
		}
	};
  const {
    openDialog,
    closeDialog,
    clickConfirm,
    isShowDialog,
    title,
    ruleForm
  } = useCrudModal({
    formRef,
    createPath: createUserApi,
    updatePath: updateUserApi,
    viewPath: viewUserApi,
    title: '用户',
    refreshList,
		otherForm: state.otherForm,
		otherInitMethod
  });
  const changeAvatar = (url: string) => {
    state.otherForm.avatar = url;
	};
  defineExpose({
    openDialog
  });
</script>

<style scoped lang="scss">

</style>
