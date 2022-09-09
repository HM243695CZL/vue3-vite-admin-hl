<template>
	<div class='dict-modal-container'>
		<el-dialog :close-on-click-modal='false' :title='title' v-model='isShowDialog' width='769px'>
			<el-form ref='formRef' :rules='rules' :model='ruleForm' size='default' label-width='100px'>
				<el-form-item label='字典类型' prop='dataType'>
					<el-input v-model='ruleForm.dataType' placeholder='请输入字典类型'></el-input>
				</el-form-item>
				<el-form-item label='字典键' prop='dataKey'>
					<el-input v-model='ruleForm.dataKey' placeholder='请输入字典键'></el-input>
				</el-form-item>
				<el-form-item label='字典值' prop='dataValue'>
					<el-input v-model='ruleForm.dataValue' placeholder='请输入字典值'></el-input>
				</el-form-item>
				<el-form-item label='备注' prop='remark'>
					<el-input v-model='ruleForm.remark' placeholder='请输入备注'></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
					<span class='dialog-footer'>
							<el-button @click='closeDialog' size='default'>取 消</el-button>
							<el-button type='primary' @click='onSubmit' size='default'>确 定</el-button>
					</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { viewDictApi, saveDictApi, updateDictApi } from '/@/api/dict';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'dictModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				dataType: '',
				dataKey: '',
				dataValue: '',
				remark: ''
			},
			rules: {
				dataType: [
					{ required: true, message: '字典类型不能为空', trigger: 'blur'}
				],
				dataKey: [
					{ required: true, message: '字典键不能为空', trigger: 'blur'}
				],
				dataValue: [
					{ required: true, message: '字典值不能为空', trigger: 'blur'}
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				state.title = '更新字典';
				viewDictApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					state.title = '新增字典';
					formRef.value.resetFields();
				})
			}
		}
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					if(state.ruleForm.id) {
						updateDictApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog();
								ctx.emit('refresh-list');
							}
						})
					} else {
						saveDictApi(state.ruleForm).then(res => {
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
			...toRefs(state),
			openDialog,
			closeDialog,
			onSubmit,
			formRef
		}
	}
});
</script>

<style scoped>

</style>
