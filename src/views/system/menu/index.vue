<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input v-model='title' size="default" placeholder="请输入菜单名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getMenuPageList'>
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table :data="dataList" style="width: 100%" row-key="id" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml10">{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.path }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width='260px'>
					<template #default="scope">
						<el-button size="small" type="text" @click="onOpenEditMenu(scope.row)">修改</el-button>
						<el-button size="small" type="text" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<AddMenu ref="addMenuRef" @refresh-list='getMenuPageList'/>
		<EditMenu ref="editMenuRef" />
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, computed, defineComponent, onMounted } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useStore } from '/@/store/index';
import AddMenu from '/@/views/system/menu/component/addMenu.vue';
import EditMenu from '/@/views/system/menu/component/editMenu.vue';
import { getMenuListApi, deleteMenuApi } from '/@/api/menu';
import { StatusEnum } from '/@/common/status.enum';

export default defineComponent({
	name: 'systemMenu',
	components: { AddMenu, EditMenu },
	setup() {
		const store = useStore();
		const addMenuRef = ref();
		const editMenuRef = ref();
		const state = reactive({
			title: '',
			dataList: []
		});
		const getMenuPageList = () => {
			getMenuListApi({
				title: state.title
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data;
				}
			})
		}
		// 打开新增菜单弹窗
		const onOpenAddMenu = () => {
			addMenuRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditMenu = (row: RouteRecordRaw) => {
			addMenuRef.value.openDialog(row);
		};
		// 删除当前行
		const onTabelRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除路由：${row.title}, 是否继续?`, '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					deleteMenuApi({
						id: row.id
					}).then(res => {
						if (res.status === StatusEnum.SUCCESS) {
							ElMessage.success('删除成功');
							getMenuPageList();
						}
					})
				})
				.catch(() => {});
		};
		onMounted(() => {
			getMenuPageList();
		});
		return {
			addMenuRef,
			editMenuRef,
			getMenuPageList,
			onOpenAddMenu,
			onOpenEditMenu,
			onTabelRowDel,
			...toRefs(state),
		};
	},
});
</script>
