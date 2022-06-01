<template>
	<el-dialog
		v-model='dialogVisible'
		title='分配权限'
		width='40%'
	>
		<el-tree
			ref='treeRef'
			:data='menuList'
			:props='defaultProps'
			default-expand-all
			show-checkbox
			node-key='id'
			:default-checked-keys='checkKeys'
		/>
		<template #footer>
      <span class='dialog-footer'>
        <el-button @click='dialogVisible = false'>取消</el-button>
        <el-button type='primary' @click='onSubmit'>确定</el-button>
      </span>
		</template>
	</el-dialog>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { getMenuListApi } from '/@/api/menu';
import { StatusEnum } from '/@/common/status.enum';
import { setRoleMenuApi, getRoleMenuApi } from '/@/api/role';
import { ElMessage } from 'element-plus';

interface Tree {
	label: string;
	children?: Tree[];
}

export default defineComponent({
	name: 'authModel',
	setup() {
		const treeRef = ref();
		const state = reactive({
			roleId: '',
			dialogVisible: false,
			defaultProps: {
				children: 'children',
				label: 'title',
			},
			menuList:[],
			checkKeys: []
		});
		// 获取菜单数据
		const getMenuList = () => {
			getMenuListApi({}).then(res =>{
				if (res.status === StatusEnum.SUCCESS) {
					state.menuList = res.data;
				}
			})
		}
		const getRoleMenu = () => {
			state.checkKeys = [];
			getRoleMenuApi({
				roleId: state.roleId
			}).then(res => {
				state.checkKeys = res.data;
			})
		}
		const openDialog = (row: any) => {
			state.roleId = row.id;
			state.dialogVisible = true;
			nextTick(() => {
				getMenuList();
				getRoleMenu();
			})
		};
		const onSubmit = () => {
			setRoleMenuApi({
				roleId: state.roleId,
				menuIds: treeRef.value.getCheckedKeys()
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("操作成功");
					state.dialogVisible = false;
				}
			})
		}
		return {
			...toRefs(state),
			openDialog,
			treeRef,
			onSubmit
		};
	},
});
</script>

<style scoped>

</style>