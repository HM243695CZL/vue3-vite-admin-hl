<template>
	<div class='comment-modal-container'>
		<el-dialog :close-on-click-modal='false' :title="title" v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='评论内容：' prop='content'>
					{{ruleForm.content}}
				</el-form-item>
				<el-form-item v-if='ruleForm.picUrls.length > 0' label='评论图片：' prop='picUrls'>
					<div class='preview-box flex-start'>
						<PreviewImg :img-url='item' v-for='item in ruleForm.picUrls' :key='item'></PreviewImg>
					</div>
				</el-form-item>
				<el-form-item label='回复内容：' prop='adminContent'>
					<span v-if='isView'>{{ruleForm.adminContent}}</span>
					<el-input v-else v-model='ruleForm.adminContent' type='textarea' :rows='5' placeholder='请输入回复内容'></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button v-if='!isView' @click="closeDialog" size="default">取 消</el-button>
					<el-button v-if='!isView' type="primary" @click="onSubmit" size="default">确 定</el-button>
					<el-button v-if='isView' @click="closeDialog" size="default">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { viewCommentApi, replyCommentApi } from '/@/api/pms/comment';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';
import PreviewImg from '/@/components/previewImg/index.vue';

export default defineComponent({
	name: 'commentModal',
	components: {
		PreviewImg
	},
	setup() {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			title: '',
			isView: false,
			ruleForm: {
				id: '',
				content: '',
				picUrls: [],
				adminContent: ''
			},
			rules: {
				adminContent: [
					{ required: true, message: '回复内容不能为空', trigger: 'blur'}
				]
			}
		});
		const openDialog  =(row: any, isView: boolean) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			state.title = '回复评论';
			nextTick(() => {
				formRef.value.resetFields();
				state.isView = isView;
				viewCommentApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm.id = res.data.id;
						state.ruleForm.content = res.data.content;
						state.ruleForm.picUrls = JSON.parse(res.data.picUrls);
						state.ruleForm.adminContent = res.data.adminContent;
					}
				})
			})
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		const onSubmit = () => {
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					replyCommentApi({
						id: state.ruleForm.id,
						adminContent: state.ruleForm.adminContent
					}).then(res => {
						if (res.status === StatusEnum.SUCCESS) {
							ElMessage.success('操作成功');
							closeDialog();
						}
					})
				}
			})
		};
		return {
			formRef,
			openDialog,
			closeDialog,
			onSubmit,
			...toRefs(state)
		}
	}
});
</script>

<style scoped lang='scss'>
.preview-box{
	.preview-img-container{
		margin-right: 15px;
	}
}
</style>
