<template>

</template>

<script lang='ts'>
import { defineComponent, reactive, ref, toRefs } from 'vue';

export default defineComponent({
	name: 'params',
	components: {

	},
	setup() {

		const state = reactive({
			paramsList: [] as any
		});

		return {

			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>

</style>
