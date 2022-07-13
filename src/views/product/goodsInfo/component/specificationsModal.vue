<template>
	<div class='specifications-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="90px">
				<el-form-item prop='specification' label='规格名'>
					<el-input :disabled='disabled' v-model='ruleForm.specification' placeholder='规格名' clearable></el-input>
				</el-form-item>
				<el-form-item prop='value' label='规格值'>
					<el-input :disabled='disabled' v-model='ruleForm.value' placeholder='规格值' clearable></el-input>
				</el-form-item>
				<el-form-item prop='picUrl' label='规格图片'>
					<SingleUpload :source-url='ruleForm.picUrl' @change-source-url='changePicUrl' />
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
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import { cloneDeep} from 'lodash';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'specificationsModal',
	components: {
		SingleUpload
	},
	props: {
		specificationList: {
			type: Array,
			default: () => []
		}
	},
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '设置规格',
			ruleForm: {
				specification: '',
				value: '',
				picUrl: '',
				updateTime: ''
			},
			rules: {},
			disabled: false
		});
		const openDialog = (row: any, type: boolean) => {
			state.isShowDialog = true;
			state.ruleForm = cloneDeep(state.ruleForm);
			state.disabled = type;
			if (row) {
				state.ruleForm = row;
			} else {
				nextTick(() => {
					formRef.value.resetFields();
				});
			}
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const changePicUrl = (url: string) => {
			state.ruleForm.picUrl = url;
		};
		const onSubmit = () => {
			let index = props.specificationList.length;
			if (!state.disabled) {
				// 新增
				let flag = false;
				for (let i = 0; i < props.specificationList.length; i ++) {
					const item = props.specificationList[i] as any;
					if (item.specification === state.ruleForm.specification) {
						if (item.value === state.ruleForm.value) {
							flag = true;
							ElMessage.error('已存在规格值：' + item.value)
						} else {
							index = i;
						}
					}
				}
				if (flag) {
					return false;
				}
			}
			state.ruleForm.updateTime = '';
			ctx.emit('change-specification', state.ruleForm, state.disabled, index);
			closeDialog();
		};
		return {
			formRef,
			openDialog,
			closeDialog,
			onSubmit,
			changePicUrl,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='less'>

</style>
