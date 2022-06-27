<template>
	<div class='product-goods-attr-cate-container'>
		<el-card shadow="hover">
			<div class='good-attr-cate-box' v-if='visibleType === "attr-type"'>
				<div class="system-user-search mb15">
					<el-button size="default" type="primary" class="ml10" @click='getGoodsAttrCateList'>
						查询
					</el-button>
					<el-button size="default" type="success" class="ml10" @click="onOpenAddGoodsAttrCate">
						新增属性分类
					</el-button>
				</div>
				<el-table :data='dataList'>
					<el-table-column prop='id' label='编号' show-overflow-tooltip />
					<el-table-column prop='name' label='类型名称' show-overflow-tooltip />
					<el-table-column prop='attributeCount' label='属性数量' show-overflow-tooltip />
					<el-table-column prop='paramCount' label='参数数量' show-overflow-tooltip />
					<el-table-column label='设置'>
						<template #default='scope'>
							<el-button size='small' type='default' @click='showGoodsAttrList(scope.row, 0)'>属性列表</el-button>
							<el-button size='small' type='default' @click='showGoodsAttrList(scope.row, 1)'>参数列表</el-button>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200">
						<template #default="scope">
							<el-button size="small" type="default" @click='onOpenEditGoodsAttrCate(scope.row)'>修改</el-button>
							<el-button size="small" type="default" @click='deleteGoodsAttrCate(scope.row)'>删除</el-button>
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
				<GoodsAttrCateModal ref='goodsAttrCateModalRef' @refresh-list='getGoodsAttrCateList' />
			</div>
			<AttrList v-if='visibleType === "attr"'
								:data-id='dataId'
								:data-type-name='dataTypeName'
								:data-type='dataType'
								@emit-back='changeVisibleType' />
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue';
import GoodsAttrCateModal from '/@/views/product/goodsAttrCate/component/goodsAttrCateModal.vue';
import AttrList from '/@/views/product/goodsAttrCate/component/attrList.vue';
import { getGoodsAttrCatePageApi, deleteGoodsAttrCateApi } from '/@/api/pms/goodsAttrCate';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productGoodsAttrCate',
	components: {
		GoodsAttrCateModal,
		AttrList
	},
	setup() {
		const goodsAttrCateModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			visibleType: 'attr-type',
			dataId: '',
			dataTypeName: '',
			dataType: 0
		});
		const getGoodsAttrCateList = () => {
			getGoodsAttrCatePageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenAddGoodsAttrCate = () => {
			goodsAttrCateModalRef.value.openDialog()
		};
		const onOpenEditGoodsAttrCate = (row: any) => {
			goodsAttrCateModalRef.value.openDialog(row);
		};
		const deleteGoodsAttrCate = (row: any) => {
			deleteGoodsAttrCateApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getGoodsAttrCateList();
				}
			})
		};
		// 点击属性列表按钮
		const showGoodsAttrList = (row: any, type: number) => {
			state.visibleType = 'attr';
			state.dataId = row.id;
			state.dataType = type;
			state.dataTypeName = row.name;
		};
		const changeVisibleType = (data: boolean) => {
			state.visibleType = 'attr-type';
			data && getGoodsAttrCateList();
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
			getGoodsAttrCateList();
		});
		return {
			getGoodsAttrCateList,
			onOpenAddGoodsAttrCate,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenEditGoodsAttrCate,
			deleteGoodsAttrCate,
			showGoodsAttrList,
			goodsAttrCateModalRef,
			changeVisibleType,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
