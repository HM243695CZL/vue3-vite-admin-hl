<template>
	<div class='product-after-sale-container'>
		<el-card shadow="hover">
			<div class='system-user-search mb15'>
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='售后编号'>
								<el-input v-model='afterSaleSn' size="default" placeholder="请输入售后编号" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='用户名称'>
								<el-input v-model='username' size="default" placeholder="请输入用户名称" clearable> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='售后状态'>
								<el-select size='default' v-model='status' placeholder='请选择售后状态' clearable>
									<el-option v-for='(val, key) in statusObj' :key='key' :label='val' :value='key'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='售后类型'>
								<el-select size='default' v-model='type' placeholder='请选择售后类型' clearable>
									<el-option v-for='(val, key) in typeObj' :key='key' :label='val' :value='key'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter='20'>
						<el-col :span='2' :offset='22'>
							<el-button size="default" type="primary" class="ml10" @click='clickSearch'>
								查询
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号'  width='60'/>
				<el-table-column prop='aftersaleSn' label='售后编号' show-overflow-tooltip />
				<el-table-column prop='username' label='用户名' show-overflow-tooltip />
				<el-table-column prop='type' label='售后类型' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag>{{typeObj[scope.row.type]}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='status' label='售后状态' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag>{{statusObj[scope.row.status]}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='reason' label='退款原因' show-overflow-tooltip />
				<el-table-column prop='amount' label='退款价格' show-overflow-tooltip >
					<template #default='scope'>
						<div class='price'>￥{{(scope.row.amount * 100 / 100).toFixed(2)}}</div>
					</template>
				</el-table-column>
				<el-table-column prop='comment' label='退款说明' show-overflow-tooltip />
				<el-table-column prop='addTime' label='申请时间' show-overflow-tooltip />
				<el-table-column label='操作' width='200'>
					<template #default='scope'>
						<el-button size='small' type='default' @click='clickView(scope.row)'>详情</el-button>
						<el-button v-if='scope.row.status === 1' size='small' type='default'>通过</el-button>
						<el-button v-if='scope.row.status === 1' size='small' type='danger'>拒绝</el-button>
						<el-button v-if='scope.row.status === 2' size='small' type='warning'>退款</el-button>
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
		<AfterSaleModal ref='afterSaleModalRef' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { getAfterSalePListApi } from '/@/api/pms/afterSale';
import { StatusEnum } from '/@/common/status.enun';
import AfterSaleModal from '/@/views/product/afterSale/component/afterSaleModal.vue';

export default defineComponent({
	name: 'productAfterSale',
	components: {
		AfterSaleModal
	},
	setup() {
		const afterSaleModalRef = ref();
		const state = reactive({
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			afterSaleSn: '',
			username: '',
			status: '',
			type: '',
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
		const getAfterSaleList = () => {
			getAfterSalePListApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				afterSaleSn: state.afterSaleSn,
				username: state.username,
				status: state.status,
				type: state.type
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex = 1;
			getAfterSaleList();
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getAfterSaleList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getAfterSaleList();
		};
		// 点击详情
		const clickView = (row: any) => {
			afterSaleModalRef.value.openDialog(row);
		};
		onMounted(() => {
			getAfterSaleList();
		});
		return {
			...toRefs(state),
			getAfterSaleList,
			onHandleSizeChange,
			onHandleCurrentChange,
			clickView,
			afterSaleModalRef,
			clickSearch
		}
	}
});
</script>

<style scoped lang='scss'>
	.product-after-sale-container{
		.price{
			color: #ff6146;
		}
	}
</style>
