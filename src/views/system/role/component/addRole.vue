<template>
	<div class="system-add-role-container">
		<el-dialog title="新增角色" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :model="ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色名称" prop='name'>
							<el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="角色描述" prop='description'>
							<el-input v-model="ruleForm.description" placeholder="请输入角色描述" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
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
import { saveRoleApi, viewRoleApi } from '/@/api/role';
import { StatusEnum } from '/@/common/status.enum';

interface RoleState {
	isShowDialog: boolean;
	ruleForm: {
		id: string;
		name: string;
		description: string;
	};
}

export default defineComponent({
	name: 'systemAddRole',
	setup: function(props, ctx) {
		const formRef = ref();
		const state = reactive<RoleState>({
			isShowDialog: false,
			ruleForm: {
				id: '',
				name: '', // 角色名称
				description: '',
			},
		});
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				viewRoleApi({
					id: row.id,
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				});
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
			saveRoleApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					closeDialog();
					ctx.emit('refresh-list');
				}
			});
		};
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			formRef,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.system-add-role-container {

}
</style>
