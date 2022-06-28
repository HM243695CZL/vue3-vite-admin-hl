<template>
	<div class='params-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="120px">
				<el-form-item prop='attribute' label='商品参数名称'>
					<el-input v-model='ruleForm.attribute' placeholder='请输入商品参数名称' clearable></el-input>
				</el-form-item>
				<el-form-item prop='value' label='商品参数值'>
					<el-input v-model='ruleForm.value' placeholder='请输入商品参数值' clearable></el-input>
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
import { cloneDeep } from 'lodash';

export default defineComponent({
	name: 'paramsModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			isAdd: true,
			title: '设置商品参数',
			ruleForm: {
				attribute: '',
				value: '',
				key: ''
			},
			rules: {}
		});
		const openDialog = (row: any, isAdd: boolean) => {
			state.isShowDialog = true;
			state.isAdd = isAdd;
			state.ruleForm = cloneDeep(state.ruleForm);
			nextTick(() => {
				if (isAdd) {
					formRef.value.resetFields();
				} else {
					state.ruleForm = cloneDeep(row);
				}
			});
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			ctx.emit('change-params', state.ruleForm, state.isAdd);
			closeDialog();
		};
		return {
			formRef,
			...toRefs(state),
			openDialog,
			closeDialog,
			onSubmit
		}
	}
});
</script>

<style scoped lang='less'>

</style>
