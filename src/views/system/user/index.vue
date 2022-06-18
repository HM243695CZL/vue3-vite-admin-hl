<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser">
					新增用户
				</el-button>
			</div>
			<el-table :data="dataList" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="userName" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userNickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" label="关联角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template>
						<el-button size="small" type="default">修改</el-button>
						<el-button size="small" type="default">删除</el-button>
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
		<AddUer ref="addUserRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { getUserPageApi } from '/@/api/user';
import AddUer from '/@/views/system/user/component/addUser.vue';

export default defineComponent({
	name: 'systemUser',
	components: { AddUer },
	setup() {
		const addUserRef = ref();
		const editUserRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0
		});
		// 初始化表格数据
		const getUserPageList = () => {
			getUserPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				console.log(res);
			})
		};
		// 打开新增角色弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditUser = (row: any) => {
			addUserRef.value.openDialog(row);
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
		};
		// 页面加载时
		onMounted(() => {
			getUserPageList();
		});
		return {
			addUserRef,
			editUserRef,
			onOpenAddUser,
			onOpenEditUser,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
