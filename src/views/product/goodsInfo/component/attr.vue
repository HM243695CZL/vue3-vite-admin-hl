<template>
	<div class='goods-attr'>
		<div class='title'>商品属性</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'attr',
});
</script>

<style scoped lang='scss'>
	.goods-attr{
		width: 80%;
		margin: 0 auto;
		.title{
			font-weight: 700;
			font-size: 18px;
			margin: 20px 0;
		}
	}
</style>
