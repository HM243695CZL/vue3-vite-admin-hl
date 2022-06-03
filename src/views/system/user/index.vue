<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input v-model='username' size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getUserPageList'>
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户
				</el-button>
				<el-button size="default" type="default" class="ml10" @click='exportData'>导出</el-button>
				<el-upload
					class="upload-demo"
					action="http://localhost:9090/user/import"
					:on-success='handleSuccess'
					:limit="1"
					:show-file-list='false'
				>
					<el-button size='default' type="default" class='ml10'>导入</el-button>
				</el-upload>
			</div>
			<el-table :data="tableData.data" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="username" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roles" label="所属角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="260">
					<template #default="scope">
						<el-button v-if='scope.row.roles === "teacher"' size="small" type="default" @click="viewCourse(scope.row)">查看教授课程</el-button>
						<el-button size="small" type="default" @click="onOpenEditUser(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click="onRowDel(scope.row)">删除</el-button>
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
		<AddUer ref="addUserRef" @refresh-list='getUserPageList'/>
		<EditUser ref="editUserRef" />
		<ViewCourseModel ref='viewCourseRef' />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getUserPageApi, deleteUserApi } from '/@/api/user';
import AddUer from '/@/views/system/user/component/addUser.vue';
import EditUser from '/@/views/system/user/component/editUser.vue';
import ViewCourseModel from './component/viewCourseModel.vue';
import { StatusEnum} from '/@/common/status.enum';

// 定义接口来定义对象的类型
interface TableDataRow {
	id: string;
	username: string;
	nickname: string;
	phone: string;
	email: string;
}
interface TableDataState {
	username: string;
	tableData: {
		data: Array<TableDataRow>;
		total: number;
		loading: boolean;
		param: {
			pageIndex: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemUser',
	components: { AddUer, EditUser, ViewCourseModel },
	setup() {
		const addUserRef = ref();
		const editUserRef = ref();
		const viewCourseRef = ref();
		const state = reactive<TableDataState>({
			username: '',
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
		const getUserPageList = () => {
			getUserPageApi({
				pageIndex: state.tableData.param.pageIndex,
				pageSize: state.tableData.param.pageSize,
				username: state.username
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.tableData.data = res.data.records;
					state.tableData.total = res.data.total;
				}
			})
		}
		// 打开新增用户弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改用户弹窗
		const onOpenEditUser = (row: TableDataRow) => {
			addUserRef.value.openDialog(row);
		};
		const viewCourse = (row: TableDataRow) => {
			viewCourseRef.value.openDialog(row);
		};
		// 删除用户
		const onRowDel = (row: TableDataRow) => {
			ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.username}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					deleteUserApi({
						id: row.id
					}).then(res => {
						if (res.status === StatusEnum.SUCCESS) {
							ElMessage.success('删除成功');
							getUserPageList()
						}
					})
				})
				.catch(() => {});
		};
		const exportData = () => {
			window.open('http://localhost:9090/user/export', '_blank')
		}
		const handleSuccess = () => {
			ElMessage.success('上传成功');
			getUserPageList();
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
			getUserPageList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageIndex = val;
			getUserPageList();
		};
		onMounted(() => {
			getUserPageList();
		});
		return {
			addUserRef,
			editUserRef,
			viewCourseRef,
			onOpenAddUser,
			onOpenEditUser,
			onRowDel,
			viewCourse,
			exportData,
			handleSuccess,
			onHandleSizeChange,
			onHandleCurrentChange,
			getUserPageList,
			...toRefs(state),
		};
	},
});
</script>
<style lang='scss' scoped>
.upload-demo{
	display: inline-block;
}
</style>