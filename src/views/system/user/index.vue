<template>
	<div class="system-user-container">
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getUserPageList'>
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
				<el-table-column prop="username" label="管理员名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop='avatar' label='管理员头像'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.avatar' />
					</template>
				</el-table-column>
				<el-table-column prop="roles" label="关联角色" show-overflow-tooltip>
					<template #default='scope'>
						<el-tag class='tag-item' type='success' v-for='item in scope.row.roles' :key='item'>{{item}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="addTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="260">
					<template #default="scope">
						<el-button size="small" type="default" @click='handleEditPass(scope.row)'>修改密码</el-button>
						<el-button size="small" type="default" @click='handleEdit(scope.row)'>修改</el-button>
						<el-button size="small" type="default" @click='handleDelete(scope.row)'>删除</el-button>
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
		<AddUer ref="addUserRef" @refresh-list='getUserPageList' />
		<UpdatePassModal ref='updatePassRef' />
	</div>
</template>

<script lang="ts">
import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { getAdminPageApi, deleteAdminApi } from '/@/api/admin';
import { StatusEnum} from '/@/common/status.enun';
import AddUer from '/@/views/system/user/component/addUser.vue';
import UpdatePassModal from '/@/views/system/user/component/updatePassModal.vue';
import { ElMessage } from 'element-plus';
import PreviewImg from '/@/components/previewImg/index.vue';

export default defineComponent({
	name: 'systemUser',
	components: { AddUer, UpdatePassModal, PreviewImg },
	setup() {
		const addUserRef = ref();
		const updatePassRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0
		});
		// 初始化表格数据
		const getUserPageList = () => {
			getAdminPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		// 打开新增角色弹窗
		const onOpenAddUser = () => {
			addUserRef.value.openDialog();
		};
		// 打开修改角色弹窗
		const handleEdit = (row: any) => {
			addUserRef.value.openDialog(row);
		};
		const handleDelete = (row: any) => {
			deleteAdminApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getUserPageList();
				}
			})
		};
		const handleEditPass = (row: any) => {
			updatePassRef.value.openDialog(row);
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
			updatePassRef,
			handleEdit,
			handleDelete,
			handleEditPass,
			getUserPageList,
			onOpenAddUser,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
		};
	},
});
</script>
<style scoped lang='scss'>
.tag-item{
	margin-right: 10px;
	&:last-child{
		margin-right: 0;
	}
}
.avatar-img{
	width: 50px;
	height: 50px;
}
</style>
