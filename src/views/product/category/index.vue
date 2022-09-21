<template>
	<div class='product-category-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-button size="default" type="primary" class="ml10" @click='getCategoryList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddCategory">
					新增类目
				</el-button>
			</div>
			<el-table :data='dataList' row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column prop='id' label='类目id' />
				<el-table-column prop='name' label='类目名称' show-overflow-tooltip />
				<el-table-column prop='iconUrl' label='类目图标'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.iconUrl' />
					</template>
				</el-table-column>
				<el-table-column prop='pic' label='类目图片'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.picUrl' />
					</template>
				</el-table-column>
				<el-table-column prop='keywords' label='关键字' show-overflow-tooltip />
				<el-table-column prop='desc' label='简介' show-overflow-tooltip />
				<el-table-column prop='level' label='级别' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag type='primary'>{{levelObj[scope.row.level]}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditCategory(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click='deleteCategory(scope.row)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<CategoryModal ref='categoryModalRef' @refresh-list='getCategoryList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { StatusEnum } from '/@/common/status.enun';
import { getCategoryListApi, deleteCategoryApi } from '/@/api/pms/category';
import CategoryModal from './component/categoryModal.vue';
import PreviewImg from '/@/components/previewImg/index.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productCategory',
	components: {
		CategoryModal, PreviewImg
	},
	setup() {
		const categoryModalRef = ref();
		const state = reactive({
			dataList: [],
			levelObj: {
				'L1': '一级类目',
				'L2': '二级类目'
			}
		});
		const onOpenAddCategory = () => {
			categoryModalRef.value.openDialog();
		};
		const getCategoryList = () => {
			getCategoryListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data;
				}
			})
		}
		const onOpenEditCategory = (row: any) => {
			categoryModalRef.value.openDialog(row);
		};
		const deleteCategory = (row: any) => {
			deleteCategoryApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getCategoryList()
				}
			})
		};
		onMounted(() => {
			getCategoryList();
		});
		return {
			getCategoryList,
			onOpenAddCategory,
			onOpenEditCategory,
			deleteCategory,
			categoryModalRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
