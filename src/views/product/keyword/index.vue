<template>
	<div class='product-keyword-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input v-model='keyword' clearable size="default" placeholder="请输入关键词" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='clickSearch'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddKeyword">
					新增关键词
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='60' />
				<el-table-column prop='keyword' label='关键词' show-overflow-tooltip />
				<el-table-column prop='url' label='链接' show-overflow-tooltip />
				<el-table-column prop='isHot' label='是否推荐'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.isHot'>是</el-tag>
						<el-tag v-else>否</el-tag>
					</template>
				</el-table-column>
				<el-table-column porp='isDefault' label='是否默认'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.isDefault'>是</el-tag>
						<el-tag v-else>否</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditKeyword(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click='deleteKeyword(scope.row)'>删除</el-button>
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
		<KeywordModal ref='keywordModalRef' @refresh-list='getKeywordList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue';
import { deleteKeywordApi, getKeywordPageApi } from '/@/api/pms/keyword';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';
import KeywordModal from '/@/views/product/keyword/component/keywordModal.vue';

export default defineComponent({
	name: 'productKeyword',
	components: {
		KeywordModal
	},
	setup() {
		const keywordModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			keyword: ''
		});

		const getKeywordList = () => {
			getKeywordPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				keyword: state.keyword
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex = 1;
			getKeywordList();
		}
		const onOpenAddKeyword = () => {
			keywordModalRef.value.openDialog();
		};
		const onOpenEditKeyword = (row: any) => {
			keywordModalRef.value.openDialog(row);
		};
		const deleteKeyword = (row: any) => {
			deleteKeywordApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("删除成功");
					getKeywordList();
				}
			})
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getKeywordList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getKeywordList();
		};
		onMounted(() => {
			getKeywordList();
		});
		return {
			...toRefs(state),
			getKeywordList,
			deleteKeyword,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenAddKeyword,
			onOpenEditKeyword,
			keywordModalRef,
			clickSearch
		}
	}
});
</script>

<style scoped lang='less'>

</style>
