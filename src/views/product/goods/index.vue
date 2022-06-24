<template>
	<div class='product-goods-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入商品名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getGoodsList'>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddGoods">
					新增商品
				</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import { getGoodsPageApi } from '/@/api/pms/goods';
import { StatusEnum } from '/@/common/status.enun';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'productGoods',
	setup() {
		const router = useRouter();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: []
		});
		const getGoodsList = () => {
			getGoodsPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenAddGoods = () => {
			router.push('/product/goodsInfo/add')
		};
		return {
			getGoodsList,
			onOpenAddGoods,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
