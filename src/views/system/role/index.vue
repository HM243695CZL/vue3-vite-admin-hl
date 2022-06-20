<template>
	<div class="system-role-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入角色名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getRolePageList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole">
					新增角色
				</el-button>
			</div>
			<el-table :data="dataList" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" label="角色标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="角色状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-butto type="default" @click="onOpenEditRole(scope.row)">修改</el-butto>
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
		<AddRole ref="addRoleRef" />
		<EditRole ref="editRoleRef" />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, ref, onMounted, defineComponent } from 'vue';
import { getRolePageApi } from '/@/api/role';
import AddRole from '/@/views/system/role/component/addRole.vue';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'systemRole',
	components: { AddRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0
		});
		const getRolePageList = () => {
			getRolePageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					console.log(res.data);
				}
			})
		};
		// 打开新增角色弹窗
		const onOpenAddRole = () => {
			addRoleRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const onOpenEditRole = (row: any) => {
			addRoleRef.value.openDialog(row);
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
			getRolePageList();
		})
		return {
			addRoleRef,
			editRoleRef,
			getRolePageList,
			onOpenAddRole,
			onOpenEditRole,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
