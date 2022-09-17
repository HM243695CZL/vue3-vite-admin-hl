<template>
	<div class='product-order-container'>
		<el-card shadow="hover">
			<div class='system-user-search mb15'>
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='订单编号'>
								<el-input v-model='orderSn' size="default" placeholder="请输入订单编号"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='收货人'>
								<el-input v-model='consignee' size="default" placeholder="请输入收货人"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='下单用户'>
								<el-input v-model='nickName' size="default" placeholder="请输入下单用户"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='订单状态'>
								<el-select size='default' v-model='orderStatus' placeholder='请选择订单状态' clearable>
									<el-option v-for='(val, key) in statusObj' :key='key' :label='val' :value='key'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter='20'>
						<el-col :span='2' :offset='22'>
							<el-button size="default" type="primary" class="ml10" @click='getOrderList'>
								查询
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='expand'>
					<template #default='scope'>
						<div class='order-goods-list'>
							<div class='list-item' v-for='item in scope.row.orderGoodsList' :key='item.id'>
								<div class='item'>
									<div class='key'>商品图片：</div>
									<div class='value'>
										<PreviewImg :img-url='item.picUrl'></PreviewImg>
									</div>
								</div>
								<div class='item'>
									<div class='key'>商品名称：</div>
									<div class='value text-overflow' :title='item.goodsName'>{{item.goodsName}}</div>
								</div>
								<div class='item'>
									<div class='key'>规格：</div>
									<div class='value'>
										<el-tag v-for='ele in JSON.parse(item.specifications)' :key='item.id + "-" + ele'>
											{{ele}}
										</el-tag>
									</div>
								</div>
								<div class='item'>
									<div class='key'>单价：</div>
									<div class='value'>{{(item.price * 100 / 100).toFixed(2)}}元</div>
								</div>
								<div class='item'>
									<div class='key'>数量：</div>
									<div class='value'>{{item.number}}件</div>
								</div>
								<div class='item'>
									<div class='key'>小计：</div>
									<div class='value'>{{((item.price * item.number) * 100 / 100).toFixed(2)}}元</div>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column type='index' label='序号' width='60' />
				<el-table-column prop='avatar' label='用户头像'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.avatar'></PreviewImg>
					</template>
				</el-table-column>
				<el-table-column prop='userName' label='下单用户' show-overflow-tooltip />
				<el-table-column prop='addTime' label='下单时间' show-overflow-tooltip />
				<el-table-column prop='orderSn' label='订单编号' show-overflow-tooltip />
				<el-table-column prop='orderStatus' label='订单状态' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag>{{statusObj[scope.row.orderStatus]}}</el-tag>
					</template>
				</el-table-column>
<!--				<el-table-column prop='orderPrice' label='订单金额' show-overflow-tooltip>-->
<!--					<template #default='scope'>-->
<!--						<span class='price'>-->
<!--							{{(scope.row.orderPrice * 100 / 100).toFixed(2)}}元-->
<!--						</span>-->
<!--					</template>-->
<!--				</el-table-column>-->
				<el-table-column prop='actualPrice' label='实付金额' show-overflow-tooltip>
					<template #default='scope'>
						<span class='price'>
							{{(scope.row.actualPrice * 100 / 100).toFixed(2)}}元
						</span>
					</template>
				</el-table-column>
				<el-table-column prop='payTime' label='支付时间' show-overflow-tooltip />
				<el-table-column prop='consignee' label='收货人' show-overflow-tooltip />
				<el-table-column prop='mobile' label='收货电话' show-overflow-tooltip />
				<el-table-column prop='shipChannel' label='物流公司' show-overflow-tooltip />
				<el-table-column label='操作' width='200'>
					<template #default='scope'>
						<el-button size='small' type='default' @click='clickView(scope.row)'>详情</el-button>
						<el-button v-if='scope.row.orderStatus === 201' size='small' type='danger' @click='clickShip(scope.row)'>发货</el-button>
						<el-button v-if='scope.row.orderStatus === 202' size='small' type='danger' @click='clickRefund(scope.row)'>退款</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="pageIndex"
				background
				v-model:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
		</el-card>
		<ShipModal ref='shipModalRef' @refresh-list='getOrderList' />
		<OrderModal ref='orderModalRef' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getOrderListApi, orderRefundApi } from '/@/api/pms/order';
import PreviewImg from '/@/components/previewImg/index.vue';
import ShipModal from '/@/views/product/order/component/shipModal.vue';
import OrderModal from '/@/views/product/order/component/orderModal.vue';
import {StatusEnum} from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productOrder',
	components: {
		PreviewImg,
		ShipModal,
		OrderModal
	},
	setup() {
		const shipModalRef = ref();
		const orderModalRef = ref();
		const state = reactive({
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			orderSn: '',
			consignee: '',
			nickName: '',
			orderStatus: null,
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
		const getOrderList = () => {
			getOrderListApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				orderSn: state.orderSn,
				consignee: state.consignee,
				nickName: state.nickName,
				orderStatus: state.orderStatus
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getOrderList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getOrderList();
		};
		// 点击详情
		const clickView = (row: any) => {
			orderModalRef.value.openDialog(row);
		};
		// 点击发货
		const clickShip = (row: any) => {
			shipModalRef.value.openDialog(row);
		};
		// 点击退款
		const clickRefund = (row: any) => {
			orderRefundApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('退款成功');
					getOrderList();
				}
			})
		}
		onMounted(() => {
			getOrderList();
		});
		return {
			...toRefs(state),
			getOrderList,
			onHandleSizeChange,
			onHandleCurrentChange,
			clickRefund,
			clickShip,
			clickView,
			shipModalRef,
			orderModalRef
		}
	}
});
</script>

<style scoped lang='scss'>
	.product-order-container{
		.price{
			color: #ff6146;
		}
		.order-goods-list{
			.list-item{
				padding: 10px 0;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.item{
					margin-right: 20px;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					.key{
						font-weight: 700;
						margin: 0 15px;
					}
					.value{
						max-width: 200px;
						.el-tag{
							margin-right: 15px;
						}
					}
				}
			}
		}
		ul{
			li{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.key{
					width: 200px;
					font-weight: 700;
					margin: 15px 0;
				}
				.value{
					flex: 1;
				}
			}
		}
	}
</style>
