<template>
	<div class='product-region-container'>
		行政区域
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
			dataList: []
		});
		const getRegionList = () => {
			getRegionListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					console.log(res);
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
