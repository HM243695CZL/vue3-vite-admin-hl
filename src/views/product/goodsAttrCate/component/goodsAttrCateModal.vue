<template>
	<div class='goods-attr-cate-model-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="120px">
				<el-form-item label='属性分类名称' prop='name'>
					<el-input v-model='ruleForm.name' placeholder='请输入属性分类名称' clearable></el-input>
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
import { saveGoodsAttrCateApi, updateGoodsAttrCateApi} from '/@/api/pms/goodsAttrCate';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'goodsAttrCateModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				name: ''
			},
			rules: {
				name: [
					{ required: true, message: '类型名称不能为空'}
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			state.title = '新增属性类型';
			if (row) {
				state.title = '修改属性类型';
				state.ruleForm.id = row.id;
				state.ruleForm.name = row.name;
			} else {
				nextTick(() => {
					formRef.value.resetFields();
				})
			}
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if(valid) {
					if (state.ruleForm.id) {
						updateGoodsAttrCateApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog()
								ctx.emit('refresh-list');
							}
						})
					} else {
						saveGoodsAttrCateApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog()
								ctx.emit('refresh-list');
							}
						})
					}
				}
			})
		};
		return {
			openDialog,
			closeDialog,
			onSubmit,
			formRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
