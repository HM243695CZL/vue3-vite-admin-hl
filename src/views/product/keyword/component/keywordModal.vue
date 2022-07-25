<template>
	<div class='keyword-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='关键词' prop='keyword'>
					<el-input v-model='ruleForm.keyword' placeholder='请输入关键词' clearable></el-input>
				</el-form-item>
				<el-form-item label='链接' prop='url'>
					<el-input v-model='ruleForm.url' placeholder='请输入链接' clearable></el-input>
				</el-form-item>
				<el-form-item label='是否推荐' prop='isHot'>
					<el-radio-group v-model='ruleForm.isHot'>
						<el-radio :label='true' size='large' border>是</el-radio>
						<el-radio :label='false' size='large' border>否</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label='是否默认' prop='isDefault'>
					<el-radio-group v-model='ruleForm.isDefault'>
						<el-radio :label='true' size='large' border>是</el-radio>
						<el-radio :label='false' size='large' border>否</el-radio>
					</el-radio-group>
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
import { saveKeywordApi, updateKeywordApi, viewKeywordApi } from '/@/api/pms/keyword';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'keywordModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				keyword: '',
				url: '',
				isHot: false,
				isDefault: false
			},
			rules: {
				keyword: [
					{ required: true, message: '关键词不能为空', trigger: 'blur'}
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				state.title = '修改关键词';
				viewKeywordApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					state.title = '新增关键词';
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
						updateKeywordApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog();
								ctx.emit('refresh-list');
							}
						})
					} else {
						saveKeywordApi(state.ruleForm).then(res => {
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
