<template>
	<div class='after-sale-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="1150px">
			<el-card class='box-card'>
				<template #header>
					<div class="card-header">
						<span>退款明细</span>
					</div>
				</template>
				<el-form size="default" label-width="90px">
					<el-form-item label='售后状态'>
						<el-tag>{{statusObj[ruleForm.afterSale.status]}}</el-tag>
					</el-form-item>
					<el-form-item label='申请时间'>
						{{ruleForm.afterSale.addTime}}
					</el-form-item>
					<el-form-item label='售后编号'>
						{{ruleForm.afterSale.aftersaleSn}}
					</el-form-item>
					<el-form-item label='退款类型'>
						<el-tag>{{typeObj[ruleForm.afterSale.type]}}</el-tag>
					</el-form-item>
					<el-form-item label='退款原因'>
						{{ruleForm.afterSale.reason}}
					</el-form-item>
					<el-form-item label='退款金额'>
						<div class='price'>￥{{(ruleForm.afterSale.amount * 100 / 100).toFixed(2)}}</div>
					</el-form-item>
					<el-form-item label='退款说明'>
						{{ruleForm.afterSale.comment}}
					</el-form-item>
					<el-form-item label='上传凭证'>
						<PreviewImg class='img-box' v-for='item in JSON.parse(ruleForm.afterSale.pictures)' :key='item' :img-url='item' />
					</el-form-item>
				</el-form>
			</el-card>
			<el-card class="box-card">
				<template #header>
					<div class="card-header">
						<span>退款商品</span>
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
							<span class='price'>￥{{(scope.row.price * 100 / 100).toFixed(2)}}</span>
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
						<span>订单明细</span>
					</div>
				</template>
				<el-form size="default" label-width="90px">
					<el-form-item label='商品总价'>
						<div class='price'>￥{{(ruleForm.orderInfo.goodsPrice * 100 / 100).toFixed(2)}}</div>
					</el-form-item>
					<el-form-item label='运费'>
						<div class='price'>￥{{(ruleForm.orderInfo.freightPrice * 100 / 100).toFixed(2)}}</div>
					</el-form-item>
					<el-form-item label='订单实付'>
						<div class='price'>￥{{(ruleForm.orderInfo.actualPrice * 100 / 100).toFixed(2)}}</div>
					</el-form-item>
				</el-form>
			</el-card>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">关 闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import { viewAfterSaleApi } from '/@/api/pms/afterSale';
import { StatusEnum } from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';


export default defineComponent({
	name: 'afterSaleModal',
	components: {
		PreviewImg
	},
	setup() {
		const state = reactive({
			isShowDialog: false,
			title: '售后详情',
			ruleForm: {
				orderInfo: {},
				orderGoodsList: [],
				afterSale: {
					pictures: null
				}
			},
			rules: {},
			statusObj: {
				0: '可申请',
				1: '用户已申请',
				2: '管理员审核通过',
				3: '管理员退款成功',
				4: '管理员审核拒绝',
				5: '用户已取消',
			},
			typeObj: {
				0: '未收货退款',
				1: '不退货退款',
				2: '退货退款',
			}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			viewAfterSaleApi({
				orderId: row.orderId
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm.orderInfo = res.data.orderInfo;
					state.ruleForm.orderGoodsList = res.data.orderGoodsList;
					state.ruleForm.afterSale = res.data.aftersale;
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
	.after-sale-modal-container{
		.box-card{
			margin-bottom: 20px;
		}
		.price{
			color: #ff6146;
		}
		.img-box{
			margin-right: 20px;
		}
	}
</style>
