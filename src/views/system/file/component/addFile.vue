<template>
	<div class='add-file-container'>
		<el-dialog title='上传文件' v-model='isShowDialog'>
			<el-form size='default' label-width='90px' ref='formRef'>
				<el-form-item label='上传' prop='file'>
					<el-upload
						class="upload-demo"
						action="http://localhost:9090/file/upload"
						:on-success='handleSuccess'
						:limit="1"
						:show-file-list='false'
					>
						<el-button size='default' type="default" class='ml10'>上传</el-button>
					</el-upload>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'addFile',
	setup () {
		const state = reactive({
			isShowDialog: false
		});
		const onCancel = () => {
			state.isShowDialog = false
		};
		const handleSuccess = () => {
			ElMessage.success('上传成功');
			onCancel();
		};
		return {
			...toRefs(state),
			onCancel,
			handleSuccess
		}
	}
})
</script>

<style scoped lang='scss'>
	.add-file-container{

	}
</style>