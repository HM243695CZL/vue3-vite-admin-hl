<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" v-model='name' placeholder="请输入角色名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getRolePageList'>
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="description" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" type="text" @click="onOpenEditRole(scope.row)">修改</el-button>
						<el-button size="small" type="text" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="tableData.param.pageIndex"
				background
				v-model:page-size="tableData.param.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="tableData.total"
			>
			</el-pagination>
		</el-card>
		<AddRole ref="addRoleRef" @refresh-list='getRolePageList' />
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import AddRole from '/@/views/system/role/component/addRole.vue';
import EditRole from '/@/views/system/role/component/editRole.vue';
import { deleteRoleApi, getRolePageApi } from '/@/api/role';
import { StatusEnum } from '/@/common/status.enum';

// 定义接口来定义对象的类型
interface TableRow {
	id: string;
	name: string;
	description: string;
}
interface TableDataState {
	name: string;
	tableData: {
		data: Array<TableRow>;
		total: number;
		loading: boolean;
		param: {
			pageIndex: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemRole',
	components: { AddRole, EditRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive<TableDataState>({
			name: '',
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageIndex: 1,
					pageSize: 10,
				},
			},
		});
		const getRolePageList = () => {
			getRolePageApi({
				pageIndex: state.tableData.param.pageIndex,
				pageSize: state.tableData.param.pageSize,
				name: state.name
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.tableData.data = res.data.records;
					state.tableData.total = res.data.total;
				}
			})
		}
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: TableRow) => {
			addRoleRef.value.openDialog(row);
		};
		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					deleteRoleApi({
						id: row.id
					}).then(res => {
						ElMessage.success('删除成功');
						getRolePageList();
					})
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageIndex = val;
		};
		// 页面加载时
		onMounted(() => {
			getRolePageList()
		});
		return {
			addRoleRef,
			editRoleRef,
			getRolePageList,
			onOpenAddRole,
			onOpenEditRole,
			onRowDel,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
