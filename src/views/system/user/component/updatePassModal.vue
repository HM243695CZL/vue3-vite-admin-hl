<template>
	<div class='update-pass-container'>
		<el-dialog :close-on-click-modal='false' title='修改密码' v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='新密码' prop='password'>
					<el-input v-model='ruleForm.password' type='password' placeholder='请输入密码'></el-input>
				</el-form-item>
				<el-form-item label='确认密码' prop='confirmPass'>
					<el-input v-model='ruleForm.confirmPass' type='password' placeholder='确认密码'></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { ElMessage } from 'element-plus';
import { updatePassApi } from '/@/api/admin';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'updatePassModal',
	setup() {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '',
				password: '',
				confirmPass: ''
			},
			rules: {
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur' },
				],
				confirmPass: [
					{ required: true, message: '请输入确认密码', trigger: 'blur'},
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = row.id;
			nextTick(() => {
				formRef.value.resetFields();
			});
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			if (state.ruleForm.password !== state.ruleForm.confirmPass) {
				ElMessage.warning('两次密码不一致');
				return false;
			}
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					updatePassApi({
						id: state.ruleForm.id,
						password: state.ruleForm.password
					}).then(res => {
						if (res.status === StatusEnum.SUCCESS) {
							ElMessage.success('操作成功');
							closeDialog();
						}
					})
				}
			});
		};
		return {
			formRef,
			closeDialog,
			openDialog,
			onSubmit,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='less'>

</style>
