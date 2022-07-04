<template>
	<div class='product-goods-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入商品名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getGoodsList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddGoods">
					新增商品
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='expand'>
					<template #default='scope'>
						<ul>
							<li>
								<div class='key'>商品ID： </div>
								<div class='value'>{{scope.row.id}}</div>
							</li>
							<li>
								<div class='key'>名称： </div>
								<div class='value'>{{scope.row.name}}</div>
							</li>
							<li>
								<div class='key'>宣传画廊:</div>
								<div class='preview-box'>
									<PreviewImg v-for='item in JSON.parse(scope.row.gallery)' :key='item' :img-url='item' />
								</div>
							</li>
							<li>
								<div class='key'>商品介绍： </div>
								<div class='value'>{{scope.row.brief}}</div>
							</li>
							<li>
								<div class='key'>商品单位： </div>
								<div class='value'>{{scope.row.unit}}</div>
							</li>
							<li>
								<div class='key'>关键字：</div>
								<div class='value'><el-tag v-for='item in scope.row.keywords.split(",")' :key='item'>{{item}}</el-tag></div>
							</li>
						</ul>
					</template>
				</el-table-column>
				<el-table-column type='index' label='序号' width='60' />
				<el-table-column prop='id' label='商品ID' />
				<el-table-column prop='name' label='商品名称' show-overflow-tooltip />
				<el-table-column prop='picUrl' label='商品图片'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.picUrl' />
					</template>
				</el-table-column>
				<el-table-column prop='counterPrice' label='市场售价' />
				<el-table-column prop='retailPrice' label='当前价格' />
				<el-table-column prop='isNew' label='是否新品'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.isNew'>新品</el-tag>
						<el-tag v-else>非新品</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='isHot' label='是否热品'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.isHot'>热品</el-tag>
						<el-tag v-else>非热品</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='isOnSale' label='是否在售'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.isOnSale'>在售</el-tag>
						<el-tag v-else>非在售</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="260">
					<template #default="scope">
						<el-button size="small" type="default" @click='handleEdit(scope.row)'>修改</el-button>
						<el-button size="small" type="default" @click='handleDelete(scope.row)'>删除</el-button>
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
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getGoodsPageApi, deleteGoodsApi } from '/@/api/pms/goods';
import { StatusEnum } from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productGoods',
	components: {
		PreviewImg
	},
	setup() {
		const router = useRouter();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: []
		});
		const getGoodsList = () => {
			getGoodsPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const handleEdit = (row: any) => {
			router.push({
				name: 'productGoodsInfo',
				params: {
					id: row.id,
					tagsViewName: `修改商品-【${row.id}】`
				}
			});
		};
		const handleDelete = (row: any) => {
			deleteGoodsApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getGoodsList();
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
		};
		const onOpenAddGoods = () => {
			router.push({
				name: 'productGoodsInfo',
				params: {
					id: 'add',
					tagsViewName: '新增商品'
				}
			})
		};
		onMounted(() => {
			getGoodsList();
		});
		return {
			getGoodsList,
			onOpenAddGoods,
			onHandleSizeChange,
			onHandleCurrentChange,
			handleEdit,
			handleDelete,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	ul{
		li{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.key{
				font-weight: 700;
				margin: 15px 0;
				width: 100px;
			}
			.value{
				.el-tag{
					margin-right: 15px;
				}
			}
			.preview-box{
				display: flex;
				justify-content: flex-start;
				align-items: center;
				.preview-img-container{
					margin-right: 15px;
				}
			}
		}
	}
</style>
