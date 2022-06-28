<template>
	<div class='params-container'>
		<div class='title'>商品参数</div>
		<el-button size='default' type='default' @click='onOpenAddParams({}, true)'>添加参数</el-button>
		<el-table :data='dataList'>
			<el-table-column prop='attribute' label='商品参数名称' show-overflow-tooltip />
			<el-table-column prop='value' label='商品参数值' show-overflow-tooltip />
			<el-table-column label='操作'>
				<template #default="scope">
					<el-button size="small" type="default" @click='onOpenAddParams(scope.row, false)'>设置</el-button>
					<el-button size="small" type="default" @click='deleteParams(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<ParamsModal ref='paramsModalRef' @change-params='changeParams' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import ParamsModal from '/@/views/product/goodsInfo/component/paramsModal.vue';

export default defineComponent({
	name: 'params',
	components: {
		ParamsModal
	},
	setup() {
		const paramsModalRef = ref();
		const state = reactive({
			dataList: [] as any
		});
		const onOpenAddParams = (row: any, isAdd: boolean) => {
			paramsModalRef.value.openDialog(row, isAdd);
		};
		const changeParams = (data: any, isAdd: boolean) => {
			if (isAdd) {
				data.key = new Date().getTime()
				state.dataList.push(data)
			} else {
				state.dataList.map((item: any, index: number) => {
					if (item.key === data.key) {
						state.dataList[index] = data;
					}
				})
			}
		};
		const deleteParams = (row: any) => {
			state.dataList.map((item: any, index: number) => {
				if (item.key === row.key) {
					state.dataList.splice(index, 1);
				}
			})
		};
		return {
			changeParams,
			onOpenAddParams,
			deleteParams,
			paramsModalRef,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.params-container{
		width: 80%;
		margin: 0 auto;
		.title{
			font-weight: 700;
			font-size: 18px;
			margin: 20px 0;
		}
	}
</style>
