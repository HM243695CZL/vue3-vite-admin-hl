<template>
	<div class='attr-list-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="1200px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="150px">
				<el-form-item prop='name' label='属性名称'>
					<el-input v-model='ruleForm.name' placeholder='请输入属性名称' clearable></el-input>
				</el-form-item>
				<el-form-item label='商品类型'>
					<el-select v-model='dataTypeName' disabled>
						<el-option :value='dataTypeName' :label='dataTypeName'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop='filterType' label='分类筛选样式'>
					<el-radio-group v-model='ruleForm.filterType'>
						<el-radio :label='1' size='large' border>普通</el-radio>
						<el-radio :label='2' size='large' border>颜色</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='searchType' label='能否进行检索'>
					<el-radio-group v-model='ruleForm.searchType'>
						<el-radio :label='0' size='large' border>不需要检索</el-radio>
						<el-radio :label='1' size='large' border>关键字检索</el-radio>
						<el-radio :label='2' size='large' border>范围检索</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='relatedStatus' label='商品属性关联'>
					<el-radio-group v-model='ruleForm.relatedStatus'>
						<el-radio :label='0' size='large' border>不关联</el-radio>
						<el-radio :label='1' size='large' border>关联</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='selectType' label='属性是否可选'>
					<el-radio-group v-model='ruleForm.selectType'>
						<el-radio :label='0' size='large' border>唯一</el-radio>
						<el-radio :label='1' size='large' border>单选</el-radio>
						<el-radio :label='2' size='large' border>多选</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='inputType' label='属性值的录入方式'>
					<el-radio-group v-model='ruleForm.inputType'>
						<el-radio :label='0' size='large' border>手工录入</el-radio>
						<el-radio :label='1' size='large' border>从列表选取</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='inputList' label='属性值可选值列表'>
					<el-input v-model='ruleForm.inputList' placeholder='多个用逗号分割' type='textarea' :rows='3' clearable></el-input>
				</el-form-item>
				<el-form-item prop='handAddStatus' label='是否支持手动新增'>
					<el-radio-group v-model='ruleForm.handAddStatus'>
						<el-radio :label='0' size='large' border>不支持</el-radio>
						<el-radio :label='1' size='large' border>支持</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item prop='sort' label='排序属性'>
					<el-input v-model='ruleForm.sort' clearable placeholder='请输入排序属性'></el-input>
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
import { saveGoodsAttrApi, updateGoodsAttrApi, viewGoodsAttrApi } from '/@/api/pms/goodsAttr';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'attrListModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			ruleForm: {
				id: '',
				productAttributeCategoryId: '',
				type: 0, // 0 规格 1 参数
				name: '', // 属性名称
				filterType: 1, // 分类筛选样式 1 普通 2 颜色
				searchType: 0, // 检索类型 0 不需要检索 1 关键字检索 2 范围检索
				relatedStatus: 0, // 相同属性产品是否关联 0 不关联 1 关联
				selectType: 0, // 选择类型 0 唯一 1 单选 2 多选
				inputType: 0, // 录入方式 0 手工录入 1 从列表选取
				inputList: '',
				handAddStatus: 0, // 手动新增 0 不支持 1 支持
				sort: '' // 排序属性
			},
			rules: {
				name: [
					{ required: true, message: '属性名称不能为空', trigger: 'blur'}
				]
			},
			dataTypeName: '',
		});
		const openDialog = (row: any, data: any) => {
			state.isShowDialog = true;
			state.dataTypeName = data.dataTypeName;
			state.ruleForm.type = data.dataType;
			state.ruleForm.productAttributeCategoryId = data.dataId;
			state.title = row.id ? '修改' : '新增';
			if (row.id) {
				viewGoodsAttrApi({
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
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					if (state.ruleForm.id) {
						updateGoodsAttrApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								ctx.emit('refresh-list');
								closeDialog();
							}
						})
					} else {
						saveGoodsAttrApi(state.ruleForm).then(res => {
							if (res.status === StatusEnum.SUCCESS) {
								ElMessage.success('操作成功');
								ctx.emit('refresh-list');
								closeDialog();
							}
						})
					}
				}
			})
		};
		return {
			...toRefs(state),
			closeDialog,
			onSubmit,
			openDialog,
			formRef
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
