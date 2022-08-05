<template>
	<div class='order-container'>
		<el-form ref='formRef' :model='ruleForm' size='default' label-width='240px'>
			<el-form-item label='下单超时多少分钟未付款自动取消'>
				<el-input v-model='ruleForm.yyx_order_unpaid'>
					<template #append>分钟</template>
				</el-input>
			</el-form-item>
			<el-form-item label='订单发货超多少天未确认自动确认'>
				<el-input v-model='ruleForm.yyx_order_un_confirm'>
					<template #append>天</template>
				</el-input>
			</el-form-item>
			<el-form-item label='确认收货多少天禁止再评论'>
				<el-input v-model='ruleForm.yyx_order_comment'>
					<template #append>天</template>
				</el-input>
			</el-form-item>
		</el-form>
		<div class='btn-box'>
			<el-button type="primary" size="default" @click='updateConfig'>确 定</el-button>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getOrderInfoApi, updateConfigApi } from '/@/api/system';
import {StatusEnum} from '/@/common/status.enun';
import { ElMessage } from 'element-plus';


export default defineComponent({
	name: 'order',
	setup() {
		const formRef = ref();
		const state = reactive({
			ruleForm: {
				yyx_order_unpaid: 0,
				yyx_order_un_confirm: 0,
				yyx_order_comment: 0
			}
		});
		const getOrderInfo = () => {
			getOrderInfoApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm = res.data;
				}
			})
		};
		const updateConfig = () => {
			updateConfigApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('配置更新成功');
				}
			})
		}
		onMounted(() => {
			getOrderInfo();
		});
		return {
			...toRefs(state),
			formRef,
			getOrderInfo,
			updateConfig
		}
	}
});
</script>

<style scoped lang='scss'>
	.order-container{
		.btn-box{
			margin-top: 15px;
			text-align: center;
		}
	}
</style>
