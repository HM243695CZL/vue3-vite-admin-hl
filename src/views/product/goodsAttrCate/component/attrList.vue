<template>
	<div class='attr-list-container'>
		<el-icon class='back-icon' @click='clickBack'>
			<ele-Back />
		</el-icon>
		<div class='title'>{{dataType === 0 ? '属性' : '参数'}}列表数据</div>
		<div class="system-user-search mb15">
			<el-button size="default" type="primary" class="ml10" @click='getGoodsAttrList'>
				查询
			</el-button>
			<el-button size='default' type='default' class='ml10' @click='deleteGoodsAttr({}, false)'>批量删除</el-button>
			<el-button size="default" type="success" class="ml10" @click="onOpenGoodsAddAttr">
				新增商品{{dataType === 0 ? '属性' : '参数'}}
			</el-button>
		</div>
		<el-table :data='dataList' ref='tableRef'>
			<el-table-column type="selection" width="55" />
			<el-table-column prop='id' label='编号' show-overflow-tooltip />
			<el-table-column prop='name' label='属性名称' show-overflow-tooltip />
			<el-table-column label='商品类型' show-overflow-tooltip>
				<template #default='scope'>
					<span>{{dataTypeName}}</span>
				</template>
			</el-table-column>
			<el-table-column prop='selectType' label='属性是否可选' show-overflow-tooltip>
				<template #default='scope'>
					<span>{{selectTypeObj[scope.row.selectType]}}</span>
				</template>
			</el-table-column>
			<el-table-column label='属性值的录入方式' show-overflow-tooltip>
				<template #default='scope'>
					<span>{{inputTypeObj[scope.row.inputType]}}</span>
				</template>
			</el-table-column>
			<el-table-column prop='inputList' label='可选值列表' show-overflow-tooltip />
			<el-table-column prop='sort' label='排序' show-overflow-tooltip />
			<el-table-column label="操作" width="200">
				<template #default="scope">
					<el-button size="small" type="default" @click='onOpenGoodsAddAttr(scope.row)'>修改</el-button>
					<el-button size="small" type="default" @click='deleteGoodsAttr(scope.row, true)'>删除</el-button>
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
		<AttrListModal ref='attrListModalRef' @refresh-list='getGoodsAttrList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getGoodsAttrPageApi, deleteGoodsAttrApi} from '/@/api/pms/goodsAttr';
import { StatusEnum } from '/@/common/status.enun';
import AttrListModal from '/@/views/product/goodsAttrCate/component/attrListModal.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'attrList',
	components: {
		AttrListModal
	},
	props: {
		dataId: {
			required: true
		},
		dataTypeName: {
			required: true
		},
		dataType: {
			required: true
		}
	},
	setup(props, ctx) {
		const attrListModalRef = ref();
		const tableRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			selectTypeObj: {
				0: '唯一',
				1: '单选',
				2: '多选'
			},
			inputTypeObj: {
				0: '手工录入',
				1: '从列表选取'
			}
		});
		const clickBack = () => {
			ctx.emit('emit-back', true);
		};
		const getGoodsAttrList = () => {
			getGoodsAttrPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				id: props.dataId,
				type: props.dataType
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenGoodsAddAttr = (row: any) => {
			attrListModalRef.value.openDialog(row, {
				dataId: props.dataId,
				dataTypeName: props.dataTypeName,
				dataType: props.dataType
			});
		};
		const deleteGoodsAttr = (row: any, single: boolean) => {
			const idsArr = [] as any;
			if (!single) {
				tableRef.value.getSelectionRows().map((item: any) => {
					idsArr.push(item.id)
				})
			}
			deleteGoodsAttrApi({
				ids: single ? [row.id] : idsArr
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getGoodsAttrList();
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
			getGoodsAttrList();
		});
		return {
			...toRefs(state),
			clickBack,
			getGoodsAttrList,
			onOpenGoodsAddAttr,
			onHandleSizeChange,
			onHandleCurrentChange,
			deleteGoodsAttr,
			attrListModalRef,
			tableRef
		}
	}
});
</script>

<style scoped lang='scss'>
	.attr-list-container{
		.title{
			margin: 10px 0;
			font-size: 20px;
			font-weight: 700;
			text-align: center;
		}
	}
</style>
