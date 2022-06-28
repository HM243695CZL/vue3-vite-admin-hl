<template>
	<div class='goods-info-container'>
		<el-card shadow="hover">
			<el-steps :active="stepIndex" finish-status="success" align-center>
				<el-step title="第一步" description="填写商品信息" />
				<el-step title="第一步" description="填写商品规格和库存" />
				<el-step title="第二步" description="填写商品参数" />
			</el-steps>
			<Info ref='infoRef' v-show='stepIndex === 0' />
			<Specifications ref='specificationsRef' v-show='stepIndex === 1' />
			<Params ref='paramsRef' v-show='stepIndex === 2' />
			<div class='btn-box'>
				<el-button type='default' v-if='stepIndex === 0'>取 消</el-button>
				<el-button type='primary' v-if='stepIndex !== 0' @click='prevStep'>上一步</el-button>
				<el-button type='primary' v-if='stepIndex !== 2' @click='nextStep'>下一步</el-button>
				<el-button type='primary' v-if='stepIndex === 2' @click='onSubmit'>确 定</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import Info from './component/info.vue';
import Specifications from './component/specifications.vue';
import Params from './component/params.vue';

export default defineComponent({
	name: 'productGoodsInfo',
	components: {
		Info, Specifications, Params
	},
	setup() {
		const infoRef = ref();
		const specificationsRef = ref();
		const paramsRef = ref();
		const state = reactive({
			stepIndex: 0
		});
		const prevStep = () => {
			state.stepIndex -= 1;
		};
		const nextStep = () => {
			state.stepIndex += 1;
		};
		const onSubmit = () => {
			const obj = {
				goods: infoRef.value.goodsForm,
				specifications: specificationsRef.value.dataList,
				products: specificationsRef.value.stockList,
				attributes: paramsRef.value.dataList
			}
			console.log(obj);
		};
		return {
			infoRef,
			specificationsRef,
			paramsRef,
			onSubmit,
			nextStep,
			prevStep,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
	.goods-info-container{
		.btn-box{
			margin: 10px 0;
			text-align: center;
		}
	}
</style>
