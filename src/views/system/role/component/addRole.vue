<template>
	<div class="system-add-role-container">
		<el-dialog :close-on-click-modal='false' title="新增角色" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :model="ruleForm" size="default" label-width="90px">
				<el-form-item label="角色名称" prop='name'>
					<el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="角色备注" prop='desc'>
					<el-input v-model="ruleForm.desc" placeholder="请输入角色备注" clearable></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, defineComponent, nextTick, ref } from 'vue';
import { saveRoleApi, viewRoleApi, updateRoleApi } from '/@/api/role';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemAddRole',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '',
				name: '',
				desc: '',
			},
		});
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				viewRoleApi({
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
				updateRoleApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						closeDialog();
						ctx.emit('refresh-list');
					}
				})
			} else {
				saveRoleApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						ctx.emit('refresh-list');
						closeDialog();
					}
				})
			}
		};
		return {
			formRef,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
