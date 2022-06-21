<template>
	<div class='category-modal-container'>
		<el-dialog :close-on-click-modal='false' title="新增商品类目" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="90px">
				<el-form-item label='类目名称' prop='name'>
					<el-input v-model='ruleForm.name' placeholder='请输入类目名称' clearable></el-input>
				</el-form-item>
				<el-form-item label='关键字' prop='keywords'>
					<el-input v-model='ruleForm.keywords' placeholder='以JSON数组的格式' type='textarea' :rows='3'></el-input>
				</el-form-item>
				<el-form-item label='级别' prop='level'>
					<el-select v-model='ruleForm.level' placeholder='请选择级别'>
						<el-option label='一级类目' value='L1'></el-option>
						<el-option label='二级类目' value='L2'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='父类目' prop='pid'>
					<el-select v-model='ruleForm.pid' placeholder='请选择父类目'>
					</el-select>
				</el-form-item>
				<el-form-item label='类目图标' prop='iconUrl'>
					<SingleUpload :source-url='ruleForm.iconUrl' @change-source-url='changeIconUrl'></SingleUpload>
				</el-form-item>
				<el-form-item label='类目图片' prop='picUrl'>
					<SingleUpload :source-url='ruleForm.picUrl' @change-source-url='changePicUrl'></SingleUpload>
				</el-form-item>
				<el-form-item label='类目简介' prop='desc'>
					<el-input v-model='ruleForm.desc' placeholder='请输入类目简介' type='textarea' :rows='3'></el-input>
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
import { viewCategoryApi, getCategoryListApi, saveCategoryApi, updateCategoryApi } from '/@/api/pms/category';
import { StatusEnum } from '/@/common/status.enun';
import SingleUpload from '/@/components/Upload/SingleUpload.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'categoryModal',
	components: {
		SingleUpload
	},
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '',
				name: '',
				keywords: '',
				level: '',
				pid: '',
				iconUrl: '',
				picUrl: '',
				desc: ''
			},
			rules: {
				name: [
					{ required: true, message: '类目名称不能为空', trigger: 'blur' }
				]
			},
			categoryList: []
		});
		const getCategoryList = () => {
			getCategoryListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.categoryList = res.data;
				}
			})
		}
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			getCategoryList();
			if (row) {
				viewCategoryApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					formRef.value.resetFields();
				})
			}
		};
		const changeIconUrl = (url: string) => {
			state.ruleForm.iconUrl = url;
		};
		const changePicUrl = (url: string) => {
			state.ruleForm.picUrl = url;
		}
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			if (state.ruleForm.id) {
				updateCategoryApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						ctx.emit('refresh-list');
					}
				})
			} else {
				saveCategoryApi(state.ruleForm).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						ElMessage.success("操作成功");
						ctx.emit('refresh-list');
					}
				})
			}
		};
		return {
			formRef,
			openDialog,
			closeDialog,
			onSubmit,
			changeIconUrl,
			changePicUrl,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
