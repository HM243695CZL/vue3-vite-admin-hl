<template>
	<div class='system-dict-container'>
		<el-card shadow="hover">
			<div class='system-user-search mb15'>
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='字典类型'>
								<el-input v-model='dataType'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='字典键'>
								<el-input v-model='dateKey'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='字典值'>
								<el-input v-model='dateValue'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-button size="default" type="primary" class="ml10" @click='getDictList'>
								查询
							</el-button>
							<el-button size="default" type="success" class="ml10" @click="openAddDict">
								新增字典
							</el-button>
						</el-col>
					</el-row>
				</el-form>
				<el-table :data='dataList'>
					<el-table-column prop='dataType' label='字典类型' show-overflow-tooltip />
					<el-table-column prop='dataKey' label='字典键' show-overflow-tooltip />
					<el-table-column prop='dataValue' label='字典值' show-overflow-tooltip />
					<el-table-column prop='remark' label='备注' show-overflow-tooltip />
					<el-table-column label="操作" width="200">
						<template #default="scope">
							<el-button size="small" type="default" @click="onOpenEditDict(scope.row)">修改</el-button>
							<el-button size="small" type="default" @click='deleteDict(scope.row)'>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-card>
		<DictModal ref='dictModalRef' @refresh-list='getDictList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getDictPageApi, deleteDictApi } from '/@/api/dict';
import { StatusEnum } from '/@/common/status.enun';
import DictModal from '/@/views/system/dict/component/dictModal.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemDict',
	components: {
		DictModal
	},
	setup() {
		const dictModalRef = ref();
		const state = reactive({
			dataList: [],
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataType: '',
			dateKey: '',
			dateValue: ''
		});
		const getDictList = () => {
			getDictPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const openAddDict = () => {
			dictModalRef.value.openDialog();
		};
		const onOpenEditDict = (row: any) => {
			dictModalRef.value.openDialog(row);
		};
		const deleteDict = (row: any) => {
			deleteDictApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getDictList();
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getDictList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getDictList();
		};
		onMounted(() => {
			getDictList();
		});
		return {
			...toRefs(state),
			onHandleSizeChange,
			onHandleCurrentChange,
			getDictList,
			dictModalRef,
			openAddDict,
			onOpenEditDict,
			deleteDict
		}
	}
});
</script>

<style scoped>

</style>
