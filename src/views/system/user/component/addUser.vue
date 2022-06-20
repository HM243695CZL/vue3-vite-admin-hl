<template>
	<div class="system-add-user-container">
		<el-dialog title="新增用户" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="90px">
				<el-form-item label="管理员名称">
					<el-input v-model="ruleForm.username" placeholder="请输入管理员名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="管理员密码">
					<el-input v-model="ruleForm.password" placeholder="请输入管理员密码" clearable></el-input>
				</el-form-item>
				<el-form-item label='头像'>
					<el-upload
						class="upload-demo"
						action="https://jsonplaceholder.typicode.com/posts/"
						:file-list="ruleForm.avatar"
						list-type="picture"
					>
						<el-button type="primary">上传图片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label='关联角色'>
					<el-select v-model='ruleForm.roleIds' placeholder='请选择角色'>
						<el-option v-for='item of roleList' :key='item.id'>

						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue';
export default defineComponent({
	name: 'systemAddUser',
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				username: '',
				password: '',
				avatar: '',
				roleIds: []
			},
			roleList: []
		});
		// 打开弹窗
		const openDialog = () => {
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog();
		};
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
