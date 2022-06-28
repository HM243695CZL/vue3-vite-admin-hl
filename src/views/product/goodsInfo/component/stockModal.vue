<template>
	<div class='stock-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="90px">
				<el-form-item prop='specifications' label='货品规格列'>
					<el-tag>{{ruleForm.specifications}}</el-tag>
				</el-form-item>
				<el-form-item prop='price' label='货品售价'>
					<el-input v-model='ruleForm.price' placeholder='请输入货品售价' clearable></el-input>
				</el-form-item>
				<el-form-item prop='number' label='货品数量'>
					<el-input v-model='ruleForm.number' placeholder='请输入获取数量' clearable></el-input>
				</el-form-item>
				<el-form-item prop='url' label='货品图片'>
					<PreviewImg :img-url='ruleForm.url' />
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
import PreviewImg from '/@/components/previewImg/index.vue';
import { cloneDeep } from 'lodash';

export default defineComponent({
	name: 'stockModal',
	components: {
		PreviewImg
	},
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '添加货品',
			ruleForm: {
				specifications: '',
				price: 0,
				number: 0,
				url: ''
			},
			rules: {}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			nextTick(() => {
				state.ruleForm = cloneDeep(row);
			});
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			ctx.emit('change-stock', state.ruleForm);
			closeDialog();
		};
		return {
			...toRefs(state),
			openDialog,
			closeDialog,
			formRef,
			onSubmit
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
