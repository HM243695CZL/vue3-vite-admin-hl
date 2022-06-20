<template>
	<div class="system-add-role-container">
		<el-dialog title="新增角色" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="90px">
				<el-form-item label="角色名称">
					<el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
				</el-form-item>
				<el-form-item label="角色备注">
					<el-input v-model="ruleForm.desc" placeholder="请输入角色备注" clearable></el-input>
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
import { saveRoleApi } from '/@/api/role';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemAddRole',
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				name: '',
				desc: '',
			},
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
			saveRoleApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("操作成功");
					closeDialog();
				}
			})
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
