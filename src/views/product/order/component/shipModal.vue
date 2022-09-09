<template>
	<div class='ship-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="400px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="90px">
				<el-form-item label='快递公司' prop='shipChannel'>
					<el-select filterable v-model='ruleForm.shipChannel' placeholder='请选择快递公司' class='w100'>
						<el-option v-for='item in channelList' :key='item.id' :label='item.dataValue' :value='item.dataKey'></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label='快递编号' prop='shipSn'>
					<el-input v-model='ruleForm.shipSn' placeholder='请输入快递单号'></el-input>
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
import { orderShipApi } from '/@/api/pms/order';
import { getDictListApi } from '/@/api/dict';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'shipModal',
	setup(props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '发货',
			ruleForm: {
				orderId: '',
				shipSn: '',
				shipChannel: ''
			},
			rules: {
				shipChannel: [
					{ required: true, message: '快递公司不能为空', trigger: 'change'}
				],
				shipSn: [
					{ required: true, message: '快递单号不能为空', trigger: 'blur'}
				]
			},
			channelList: [] as any
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.orderId = row.id;
			nextTick(() => {
				formRef.value.resetFields();
			})
			getDictListApi({
				dataType: 'express'
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.channelList = res.data;
				}
			});
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					orderShipApi({
						orderId: state.ruleForm.orderId,
						shipSn: state.ruleForm.shipSn,
						shipChannel: state.ruleForm.shipChannel
					}).then(res => {
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
