<template>
	<div class='auth-model-container'>
		<el-dialog :close-on-click-modal='false' title='分配权限' v-model="isShowDialog" width="769px">
			<el-tree
				ref='treeRef'
				:data="menuList"
				show-checkbox
				node-key="id"
				default-expand-all
				:default-checked-keys="selectedMenuIds"
				:props="defaultProps"
			/>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { getMenuListApi } from '/@/api/menu';
import { viewAuthApi, saveAuthApi } from '/@/api/role';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'authModel',
	setup() {
		const treeRef = ref();
		const state = reactive({
			id: '',
			isShowDialog: false,
			menuList: [],
			selectedMenuIds: [],
			defaultProps: {
				children: 'children',
				label: 'title'
			}
		});
		const getMenuList = () => {
			getMenuListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.menuList = res.data;
				}
			})
		}
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.id = row.id;
			getMenuList();
			viewAuthApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.selectedMenuIds = res.data;
				}
			});
		}
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			saveAuthApi({
				menuIds: treeRef.value.getCheckedKeys(),
				id: state.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("授权成功");
					closeDialog();
				}
			})
		};
		return {
			treeRef,
			openDialog,
			closeDialog,
			onSubmit,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
