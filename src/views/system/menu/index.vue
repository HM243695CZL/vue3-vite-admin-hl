<template>
	<div class="system-menu-container">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-button size="default" type="primary" class="ml10" @click='getMenuList'>
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
			<el-table :data="dataList" style="width: 100%" row-key="path" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml10">{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.component }}</span>
					</template>
				</el-table-column>
				<el-table-column label="权限标识" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.roles }}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="240">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditMenu(scope.row)">修改</el-button>
						<el-button size="small" type="default" @click='handleDelete(scope.row)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<AddMenu ref="addMenuRef" @refresh-list='getMenuList'/>
	</div>
</template>

<script lang="ts">
import { ref, toRefs, reactive, defineComponent, onMounted } from 'vue';
import AddMenu from '/@/views/system/menu/component/addMenu.vue';
import { getMenuListApi, deleteMenuApi } from '/@/api/menu';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemMenu',
	components: { AddMenu },
	setup() {
		const addMenuRef = ref();
		const editMenuRef = ref();
		const state = reactive({
			dataList: []
		});
		const getMenuList = () => {
			getMenuListApi().then(res => {
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
		const onOpenEditMenu = (row: any) => {
			addMenuRef.value.openDialog(row);
		};
		const handleDelete = (row: any) => {
			deleteMenuApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getMenuList();
				}
			})
		};
		onMounted(() => {
			getMenuList();
		});
		return {
			addMenuRef,
			editMenuRef,
			getMenuList,
			onOpenAddMenu,
			onOpenEditMenu,
			handleDelete,
			...toRefs(state),
		};
	},
});
</script>
