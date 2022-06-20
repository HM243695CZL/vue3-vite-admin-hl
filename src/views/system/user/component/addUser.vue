<template>
	<div class="system-add-user-container">
		<el-dialog title="新增用户" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :model="ruleForm" size="default" label-width="90px">
				<el-form-item label="管理员名称" prop='username'>
					<el-input v-model="ruleForm.username" placeholder="请输入管理员名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="管理员密码" prop='password'>
					<el-input v-model="ruleForm.password" placeholder="请输入管理员密码" clearable></el-input>
				</el-form-item>
				<el-form-item label='头像' prop='avatar'>
					<SingleUpload :source-url='ruleForm.avatar' @change-source-url='changeAvatar'></SingleUpload>
				</el-form-item>
				<el-form-item label='关联角色' prop='roleIds'>
					<el-select v-model='ruleForm.roleIds' placeholder='请选择角色' multiple>
						<el-option v-for='item of roleList' :key='item.id' :label='item.name' :value='item.id'>
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
import { reactive, toRefs, defineComponent, nextTick, ref } from 'vue';
import { getRoleListApi } from '/@/api/role';
import { saveAdminApi, viewAdminApi, updateAdminApi } from '/@/api/admin';
import { StatusEnum } from '/@/common/status.enun';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemAddUser',
	components: {
		SingleUpload
	},
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '',
				username: '',
				password: '',
				avatar: '',
				roleIds: []
			},
			roleList: []
		});
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			getRoleList();
			if (row) {
				viewAdminApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					formRef.value.resetFields();
				})
			}
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
			if (state.ruleForm.id) {
				updateAdminApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						closeDialog();
						ctx.emit('refresh-list');
					}
				})
			} else {
				saveAdminApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						closeDialog();
						ctx.emit('refresh-list');
					}
				})
			}
		};
		const changeAvatar = (url: string) => {
			state.ruleForm.avatar = url;
		}
		const getRoleList = () => {
			getRoleListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.roleList = res.data;
				}
			})
		}
		return {
			formRef,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			changeAvatar,
			...toRefs(state),
		};
	},
});
</script>
