<template>
	<div class='product-brand-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入制造商名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getBrandList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddBrand">
					新增品牌制造商
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column prop='name' label='品牌商名称' show-overflow-tooltip />
				<el-table-column prop='desc' label='介绍' show-overflow-tooltip />
				<el-table-column prop='picUrl' label='品牌商图片'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.picUrl' />
					</template>
				</el-table-column>
				<el-table-column prop='floorPrice' label='底价' show-overflow-tooltip />
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditBrand(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click='deleteBrand(scope.row)'>删除</el-button>
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
		<BrandModal ref='brandModalRef' @refresh-list='getBrandList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getBrandPageApi, deleteBrandApi } from '/@/api/pms/brand';
import { StatusEnum } from '/@/common/status.enun';
import BrandModal from '/@/views/product/brand/component/brandModal.vue';
import PreviewImg from '/@/components/previewImg/index.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productBrand',
	components: {
		BrandModal,
		PreviewImg
	},
	setup() {
		const brandModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: []
		});
		const getBrandList = () => {
			getBrandPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenAddBrand = () => {
			brandModalRef.value.openDialog();
		};
		const onOpenEditBrand = (row: any) => {
			brandModalRef.value.openDialog(row);
		};
		const deleteBrand = (row: any) => {
			deleteBrandApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getBrandList();
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
		onMounted(() => {
			getBrandList()
		});
		return {
			getBrandList,
			onOpenAddBrand,
			onOpenEditBrand,
			deleteBrand,
			onHandleSizeChange,
			onHandleCurrentChange,
			brandModalRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
