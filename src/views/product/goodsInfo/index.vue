<template>
	<div class='goods-info-container'>
		<el-card shadow="hover">
			<el-steps :active="stepIndex" finish-status="success" align-center>
				<el-step title="第一步" description="填写商品信息" />
				<el-step title="第二步" description="填写商品属性" />
			</el-steps>
			<Info ref='infoRef' v-show='stepIndex === 0' />
			<Attr ref='attrRef' v-show='stepIndex === 1' />
			<div class='btn-box'>
				<el-button type='default' v-if='stepIndex === 0'>取 消</el-button>
				<el-button type='primary' v-if='stepIndex === 0' @click='stepIndex = 1'>下一步</el-button>
				<el-button type='primary' v-if='stepIndex === 1' @click='stepIndex = 0'>上一步</el-button>
				<el-button type='primary' v-if='stepIndex === 1' @click='onSubmit'>确 定</el-button>
			</div>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import Info from './component/info.vue';
import Attr from './component/attr.vue';

export default defineComponent({
	name: 'productGoodsInfo',
	components: {
		Info, Attr
	},
	setup() {
		const infoRef = ref();
		const attrRef = ref();
		const state = reactive({
			stepIndex: 0
		});
		const onSubmit = () => {
			console.log(infoRef.value.goodsForm);
		};
		return {
			infoRef,
			attrRef,
			onSubmit,
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
