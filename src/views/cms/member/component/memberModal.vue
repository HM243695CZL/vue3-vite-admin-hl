<template>
	<div class='member-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='用户名' prop='username'>
					<el-input v-model='ruleForm.username' :disabled='true'></el-input>
				</el-form-item>
				<el-form-item label='用户昵称' prop='nickname'>
					<el-input v-model='ruleForm.nickname' placeholder='请输入用户昵称'></el-input>
				</el-form-item>
				<el-form-item label='用户手机号' prop='mobile'>
					<el-input v-model='ruleForm.mobile' type='number' placeholder='请输入用户手机号'></el-input>
				</el-form-item>
				<el-form-item label='用户性别' prop='gender'>
					<el-select v-model='ruleForm.gender' placeholder='请选择用户性别'>
						<el-option label='未知' value='0'></el-option>
						<el-option label='男' value='1'></el-option>
						<el-option label='女' value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='用户等级' prop='userLevel'>
					<el-select v-model='ruleForm.userLevel' placeholder='请选择用户等级'>
						<el-option label='普通用户' :value='0'></el-option>
						<el-option label='VIP用户' :value='1'></el-option>
						<el-option label='高级VIP' :value='2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='状态' prop='status'>
					<el-select v-model='ruleForm.status' placeholder='请选择状态'>
						<el-option label='可用' :value='0'></el-option>
						<el-option label='禁用' :value='1'></el-option>
						<el-option label='注销' :value='2'></el-option>
					</el-select>
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
import { viewMemberApi, updateMemberApi } from '/@/api/cms/member';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'memberModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '编辑会员',
			ruleForm: {
				id: '',
				username: '',
				nickname: '',
				mobile: '',
				gender: '',
				userLevel: '',
				status: ''
			},
			rules: {}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			viewMemberApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm = res.data;
				}
			})
			nextTick(() => {
				formRef.value.resetFields();
			})
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					updateMemberApi(state.ruleForm).then(res => {
						if (res.status === StatusEnum.SUCCESS) {
							ElMessage.success('操作成功');
							closeDialog();
							ctx.emit('refresh-list');
						}
					})
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

<style scoped>

</style>
