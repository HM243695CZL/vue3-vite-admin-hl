<template>
	<div class='issue-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='问题内容' prop='question'>
					<el-input v-model='ruleForm.question' placeholder='请输入问题内容' clearable></el-input>
				</el-form-item>
				<el-form-item label='问题回复' prop='answer'>
					<el-input v-model='ruleForm.answer' placeholder='请输入问题回复' type='textarea' :rows='3' clearable></el-input>
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
import { saveIssueAPi, updateIssueApi, viewIssueAPi } from '/@/api/pms/issue';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'issueModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				question: '',
				answer: ''
			},
			rules: {
				question: [
					{ required: true, message: '问题内容不能为空', trigger: 'blur' }
				],
				answer: [
					{ required: true, message: '问题回复不能为空', trigger: 'blur' }
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				state.title = '修改问题';
				viewIssueAPi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					state.title = '新增问题';
					formRef.value.resetFields();
				})
			}
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					if (state.ruleForm.id) {
						updateIssueApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog();
								ctx.emit('refresh-list');
							}
						})
					} else {
						saveIssueAPi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog();
								ctx.emit('refresh-list');
							}
						})
					}
				}
			})
		};
		return {
			formRef,
			openDialog,
			closeDialog,
			onSubmit,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='less'>

</style>
