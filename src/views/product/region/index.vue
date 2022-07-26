<template>
	<div class='product-region-container'>
		<el-card shadow="hover">
			<el-table :data='dataList' row-key='id' :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
				<el-table-column prop='id' label='区域id' />
				<el-table-column prop='code' label='区域编码' />
				<el-table-column prop='value' label='区域名称' />
				<el-table-column prop='level' label='区域类型'>
					<template #default='scope'>
						<el-tag>{{levelObj[scope.row.level]}}</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getRegionListApi } from '/@/api/pms/region';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'productRegion',
	setup() {
		const state = reactive({
			dataList: [],
			levelObj: {
				0: '省',
				1: '市',
				2: '县'
			}
		});
		const getRegionList = () => {
			getRegionListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data;
				}
			})
		};
		onMounted(() => {
			getRegionList();
		});
		return {
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='less'>

</style>
