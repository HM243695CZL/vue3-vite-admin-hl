<template>
	<div class='product-issue-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input v-model='question' clearable size="default" placeholder="请输入问题内容" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getIssueList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddIssue">
					新增问题
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column prop='question' label='问题内容' show-overflow-tooltip />
				<el-table-column prop='answer' label='问题回复' show-overflow-tooltip />
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditIssue(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click='deleteIssue(scope.row)'>删除</el-button>
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
		<IssueModal ref='issueModalRef' @refresh-list='getIssueList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getIssuePageApi, deleteIssueApi } from '/@/api/pms/issue';
import IssueModal from '/@/views/product/issue/component/issueModal.vue';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productIssue',
	components: {
		IssueModal
	},
	setup() {
		const issueModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			question: ''
		});
		const getIssueList = () => {
			getIssuePageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				question: state.question
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenAddIssue = () => {
			issueModalRef.value.openDialog()
		};
		const onOpenEditIssue = (row: any) => {
			issueModalRef.value.openDialog(row);
		};
		const deleteIssue = (row: any) => {
			deleteIssueApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getIssueList();
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getIssueList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getIssueList();
		};
		onMounted(() => {
			getIssueList();
		});
		return {
			...toRefs(state),
			onHandleSizeChange,
			onHandleCurrentChange,
			getIssueList,
			onOpenAddIssue,
			onOpenEditIssue,
			deleteIssue,
			issueModalRef
		}
	}
});
</script>

<style scoped>

</style>
