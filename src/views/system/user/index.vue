<template>
	<div class="user-container h100" ref='userRef'>
		<CommonTop

		/>
		<vxe-table
			ref='tableRef'
			:row-config='{
				useKey: true,
				keyField: "id"
			}'
			:data='dataList'
		>
			<vxe-column type='seq' title='序号' width='60' />
			<vxe-column title='用户名称' field='username' />
			<vxe-column title='用户头像'>
				<template #default='scope'>
					<PreviewImg :img-url='scope.row.avatar' />
				</template>
			</vxe-column>
			<vxe-column title='关联角色'>
				<template #default='scope'>
					<el-tag v-for='item of scope.row.roles' :key='item'>{{item}}</el-tag>
				</template>
			</vxe-column>
			<vxe-column title='创建时间' field='addTime' />
			<vxe-column title='操作' width='260'>
				<template #default='scope'>
					<el-button size='small' type='default'>修改密码</el-button>
					<el-button size='small' type='default'>修改</el-button>
					<el-button size='small' type='default'>删除</el-button>
				</template>
			</vxe-column>
		</vxe-table>
	</div>
</template>

<script lang="ts">
	import useCrud from '/@/hooks/useCrud';
	import { reactive, ref } from 'vue';
	import { getUserPageApi } from '/@/api/system/user';
	import PreviewImg from '/@/components/previewImg/index.vue';
	import CommonTop from '/@/components/CommonTop/index.vue';

	export default {
		name: 'user',
		components: {
			PreviewImg,
			CommonTop
		},
		setup() {
			const userRef = ref();
			const state = reactive({
				uris: {
					page: getUserPageApi
				}
			})
			const {
				getDataList,
				pageInfo,
				dataList,
				tableHeight,
				tableRef
			} = useCrud({
				uris: state.uris,
				parentRef: userRef
			});
			return {
				userRef,

				tableRef,
				dataList,
				tableHeight
			}
		}
	}
</script>
<style scoped lang='scss'>
	.user-container{
		padding: 20px;
		overflow: auto;
	}
</style>
