<template>

</template>

<script lang='ts'>
import { defineComponent, nextTick, onMounted, reactive, ref, toRefs } from 'vue';

import { ElMessage } from 'element-plus';
import { getCategoryListApi } from '/@/api/pms/category';
import { StatusEnum } from '/@/common/status.enun';
import { getBrandListApi } from '/@/api/pms/brand';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'info',
	props: {
		goods: {
			type: Object,
			default: () => {}
		}
	},
	components: {

	},
	setup(props) {

		const route = useRoute();
		const state = reactive({

		});

		onMounted(() => {

		});
		return {

			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
