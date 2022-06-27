<template>
	<div class='brand-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='品牌商名称' prop='name'>
					<el-input v-model='ruleForm.name' placeholder='请输入品牌商名称' clearable></el-input>
				</el-form-item>
				<el-form-item label='介绍' prop='desc'>
					<el-input v-model='ruleForm.desc' placeholder='请输入品牌商名称' type='textarea' :rows='3'></el-input>
				</el-form-item>
				<el-form-item label='品牌商图片' prop='picUrl'>
					<SingleUpload :source-url='ruleForm.picUrl' @change-source-url='changePicUrl'></SingleUpload>
				</el-form-item>
				<el-form-item label='底价' prop='floorPrice'>
					<el-input v-model='ruleForm.floorPrice' placeholder='请输入底价，仅用于页面显示'></el-input>
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
import { saveBrandApi, updateBrandApi, viewBrandApi } from '/@/api/pms/brand';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'brandModal',
	components: {
		SingleUpload
	},
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				name: '',
				desc: '',
				picUrl: '',
				floorPrice: ''
			},
			rules: {
				name: [
					{ required: true, message: '品牌商名称', trigger: 'blur'}
				]
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				state.title = '修改品牌制造商';
				viewBrandApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					state.title = '新增品牌制造商';
					formRef.value.resetFields();
				})
			}
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const changePicUrl = (url: string) => {
			state.ruleForm.picUrl = url;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					if (state.ruleForm.id) {
						updateBrandApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								closeDialog();
								ctx.emit('refresh-list');
							}
						})
					} else {
						saveBrandApi(state.ruleForm).then(res => {
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
			changePicUrl,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
