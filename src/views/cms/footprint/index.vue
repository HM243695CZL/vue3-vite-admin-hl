<template>
	<div class='cms-footprint-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户id" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getFootprintList'>
					查询
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='80' />
				<el-table-column prop='userId' label='用户id' />
				<el-table-column prop='goodsId' label='商品id' />
				<el-table-column prop='addTime' label='添加时间' />
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
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getFootprintPageApi } from '/@/api/cms/footprint';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'cmsFootprint',
	setup() {
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
		});
		const getFootprintList = () => {
			getFootprintPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getFootprintList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getFootprintList();
		};
		onMounted(() => {
			getFootprintList();
		})
		return {
			...toRefs(state),
			getFootprintList,
			onHandleSizeChange,
			onHandleCurrentChange
		}
	}
});
</script>

<style scoped>

</style>
