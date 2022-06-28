<template>
	<div class='goods-specifications'>
		<el-divider>
			<div class='title'>商品规格</div>
		</el-divider>
		<el-button size='default' type='default' @click='onOpenAddSpecifications'>添加规格</el-button>
		<el-table :data='dataList'>
			<el-table-column prop='specification' label='规格名' />
			<el-table-column prop='value' label='规格值'>
				<template #default='scope'>
					<el-tag>{{scope.row.value}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop='picUrl' label='规格图片'>
				<template #default='scope'>
					<PreviewImg :img-url='scope.row.picUrl' />
				</template>
			</el-table-column>
			<el-table-column label='操作'>
				<template #default="scope">
					<el-button size="small" type="default" @click='deleteSpecification(scope.row)'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-divider class='stock-divider'>
			<div class='title'>商品库存</div>
		</el-divider>
		<el-table :data='stockList'>
			<el-table-column prop='specifications' label='货品规格'>
				<template #default='scope'>
					<el-tag>{{scope.row.specifications}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop='price' label='货品售价'  />
			<el-table-column prop='number' label='货品数量'  />
			<el-table-column prop='url' label='货品图片'>
				<template #default='scope'>
					<PreviewImg :img-url='scope.row.url' />
				</template>
			</el-table-column>
			<el-table-column label='操作'>
				<template #default="scope">
					<el-button size="small" type="default" @click='setStockInfo(scope.row)'>设置</el-button>
				</template>
			</el-table-column>
		</el-table>
		<SpecificationsModal ref='specificationsModalRef' @change-specification='changeSpecification' />
		<StockModal ref='stockModalRef' @change-stock='changeStock' />
	</div>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref, toRefs } from 'vue';
import SpecificationsModal from './specificationsModal.vue';
import PreviewImg from '/@/components/previewImg/index.vue';
import StockModal from '/@/views/product/goodsInfo/component/stockModal.vue';

export default defineComponent({
	name: 'specifications',
	components: {
		SpecificationsModal,
		PreviewImg,
		StockModal
	},
	setup() {
		const specificationsModalRef = ref();
		const stockModalRef = ref();
		const state = reactive({
			dataList: [] as any,
			stockList: [] as any
		});
		const onOpenAddSpecifications = () => {
			specificationsModalRef.value.openDialog();
		};
		const changeSpecification = (data: any) => {
			data.key = new Date().getTime();
			state.dataList.push(data);
			state.stockList.push({
				specifications: data.value,
				price: 0,
				number: 0,
				url: data.picUrl
			})
		};
		const deleteSpecification = (row: any) => {
			state.dataList.map((item: any, index: number) => {
				if (row.key === item.key) {
					state.dataList.splice(index, 1);
					state.stockList.splice(index, 1);
				}
			})
		};
		const setStockInfo = (row: any) => {
			stockModalRef.value.openDialog(row);
		};
		const changeStock = (data: any) => {
			state.stockList.map((item: any, index: number) => {
				if (item.specifications === data.specifications) {
					state.stockList[index] = data;
				}
			});
		};
		return {
			specificationsModalRef,
			stockModalRef,
			changeSpecification,
			onOpenAddSpecifications,
			deleteSpecification,
			setStockInfo,
			changeStock,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.goods-specifications{
		width: 80%;
		margin: 0 auto;
		.title{
			font-weight: 700;
			font-size: 18px;
			margin: 20px 0;
		}
		.stock-divider{
			margin-top: 50px;
		}
	}
</style>
