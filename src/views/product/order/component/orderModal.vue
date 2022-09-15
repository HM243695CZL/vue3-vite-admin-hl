<template>
	<div class='order-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="1150px">
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>订单信息</span>
					</div>
				</template>
				<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="120px">
					<el-form-item label='订单编号'>
						{{ruleForm.orderInfo.orderSn}}
					</el-form-item>
					<el-form-item label='订单状态'>
						<el-tag>{{statusObj[ruleForm.orderInfo.orderStatus]}}</el-tag>
					</el-form-item>
					<el-form-item label='下单用户'>
						{{ruleForm.orderInfo.userName}}
					</el-form-item>
					<el-form-item label='用户留言'>
						{{ruleForm.orderInfo.message}}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>收货信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='收货人'>
						{{ruleForm.orderInfo.consignee}}
					</el-form-item>
					<el-form-item label='手机号'>
						{{ruleForm.orderInfo.mobile}}
					</el-form-item>
					<el-form-item label='地址'>
						{{ruleForm.orderInfo.address}}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>商品信息</span>
					</div>
				</template>
				<el-table :data='ruleForm.orderGoodsList'>
					<el-table-column type='index' label='序号' width='60' />
					<el-table-column prop='goodsName' label='商品名称' show-overflow-tooltip />
					<el-table-column prop='goodsSn' label='商品编号' show-overflow-tooltip />
					<el-table-column prop='specifications' label='货品规格' show-overflow-tooltip>
						<template #default='scope'>
							<el-tag v-for='item of JSON.parse(scope.row.specifications)' :key='item'>{{item}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop='price' label='货品价格'>
						<template #default='scope'>
							<span class='price'>{{scope.row.price}}￥</span>
						</template>
					</el-table-column>
					<el-table-column prop='number' label='货品数量' />
					<el-table-column prop='picUrl' label='货品图片'>
						<template #default='scope'>
							<PreviewImg :img-url='scope.row.picUrl' />
						</template>
					</el-table-column>
				</el-table>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>费用信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='费用'>
						<span class='tip'>(商品总价)</span>
						&nbsp;<span class='price'>{{ruleForm.orderInfo.goodsPrice}}￥</span> + &nbsp;
						<span class='tip'>(快递费用)</span>
						&nbsp;<span class='price'>{{ruleForm.orderInfo.freightPrice}}￥</span> = &nbsp;
						<span class='tip'>(实际费用)</span>
						&nbsp;<span class='price'>{{ruleForm.orderInfo.actualPrice}}￥</span>
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>支付信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='支付渠道'>
						{{ruleForm.orderInfo.payTime ? '微信支付' : '-'}}
					</el-form-item>
					<el-form-item label='支付时间'>
						{{ruleForm.orderInfo.payTime ? ruleForm.orderInfo.payTime : '-'}}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>快递信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='快递公司'>
						{{ruleForm.orderInfo.shipName ? ruleForm.orderInfo.shipName : '-'}}
					</el-form-item>
					<el-form-item label='快递单号'>
						{{ruleForm.orderInfo.shipSn ? ruleForm.orderInfo.shipSn : '-'}}
					</el-form-item>
					<el-form-item label='发货时间'>
						{{ruleForm.orderInfo.shipTime ? ruleForm.orderInfo.shipTime : '-'}}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>退款信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='退款金额'>
						<span class='price'>{{ruleForm.orderInfo.refundAmount ? ruleForm.orderInfo.refundAmount + '￥' : '-'}}</span>
					</el-form-item>
					<el-form-item label='退款类型'>
						{{ruleForm.orderInfo.refundType ? ruleForm.orderInfo.refundType : '-'}}
					</el-form-item>
					<el-form-item label='退款原因'>
						{{ruleForm.orderInfo.applyRefundReason ? ruleForm.orderInfo.applyRefundReason : '-'}}
					</el-form-item>
					<el-form-item label='退款备注'>
						{{ruleForm.orderInfo.refundContent ? ruleForm.orderInfo.refundContent : '-'}}
					</el-form-item>
					<el-form-item label='退款时间'>
						{{ruleForm.orderInfo.refundTime ? ruleForm.orderInfo.refundTime : '-'}}
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>退款信息</span>
					</div>
				</template>
				<el-form size="default" label-width="120px">
					<el-form-item label='确认收货时间'>
						{{ruleForm.orderInfo.confirmTime ? ruleForm.orderInfo.confirmTime : '-'}}
					</el-form-item>
				</el-form>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import { viewOrderApi } from '/@/api/pms/order';
import { StatusEnum } from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';

export default defineComponent({
	name: 'orderModal',
	components: {
		PreviewImg
	},
	setup() {
		const state = reactive({
			isShowDialog: false,
			title: '订单详情',
			ruleForm: {
				orderInfo: {},
				orderGoodsList: []
			},
			rules: {},
			statusObj: {
				101: '未付款',
				102: '用户取消',
				103: '系统取消',
				201: '已付款',
				202: '申请退款',
				203: '已退款',
				301: '已发货',
				401: '用户收货',
				402: '系统收货'
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			viewOrderApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm.orderInfo = res.data.orderInfo;
					state.ruleForm.orderGoodsList = res.data.orderGoodsList;
				}
			})
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		return {
			...toRefs(state),
			openDialog,
			closeDialog
		}
	}
});
</script>

<style scoped lang='scss'>
	.order-modal-container{
		.box-card{
			margin-bottom: 20px;
		}
		.tip{
			color: #999;
		}
		.price{
			color: #ff6146;
		}
	}
</style>
