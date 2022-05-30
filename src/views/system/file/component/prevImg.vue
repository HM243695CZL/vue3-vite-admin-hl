<template>
	<el-dialog
		v-model="dialogVisible"
		title="预览图片"
		width="75%"
	>
		<img class='img' :src='imgUrl' alt=''>
		<template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
		</template>
	</el-dialog>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
	name: 'prevImg',
	setup() {
		const state = reactive({
			dialogVisible: false,
			imgUrl: ''
		});
		const openDialog = data => {
			state.dialogVisible = true;
			state.imgUrl = data
		}
		return {
			...toRefs(state),
			openDialog
		}
	}
})
</script>

<style scoped>
	.img{
		display: block;
		width: 100%;
		height: auto;
	}
</style>