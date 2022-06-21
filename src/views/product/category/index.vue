<template>
	<div class='product-category-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入类目名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getCategoryList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddCategory">
					新增类目
				</el-button>
			</div>
		</el-card>
		<CategoryModal ref='categoryModalRef' @refresh-list='getCategoryList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { StatusEnum } from '/@/common/status.enun';
import { getCategoryPageApi } from '/@/api/pms/category';
import CategoryModal from './component/categoryModal.vue';

export default defineComponent({
	name: 'productCategory',
	components: {
		CategoryModal
	},
	setup() {
		const categoryModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0
		});
		const onOpenAddCategory = () => {
			categoryModalRef.value.openDialog();
		};
		const getCategoryList = () => {
			getCategoryPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
		};
		onMounted(() => {
			getCategoryList();
		});
		return {
			getCategoryList,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenAddCategory,
			categoryModalRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
