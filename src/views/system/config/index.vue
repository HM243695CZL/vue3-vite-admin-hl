<template>
	<div class='system-config-container'>
		<el-card shadow='hover'>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="运费配置" name="freight">
					<Freight />
				</el-tab-pane>
				<el-tab-pane label="订单配置" name="order">
					<Order />
				</el-tab-pane>
			</el-tabs>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import Freight from '/@/views/system/config/component/freight.vue';
import Order from '/@/views/system/config/component/order.vue';

export default defineComponent({
	name: 'systemConfig',
	components: {
		Freight, Order
	},
	setup() {
		const state = reactive({
			activeName: 'freight'
		});
		const handleClick = (tab: any) => {
			console.log(tab.paneName);
		}
		return {
			...toRefs(state),
			handleClick
		}
	}
});
</script>

<style scoped>

</style>
