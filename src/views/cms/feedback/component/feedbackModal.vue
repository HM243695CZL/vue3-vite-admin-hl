<template>
	<div class='feedback-modal-container'>
		<el-dialog :close-on-click-modal='false' title='反馈信息' v-model="isShowDialog" width="769px">
			<el-form ref='formRef' :rules='rules' :model="ruleForm" size="default" label-width="100px">
				<el-form-item label='反馈用户' prop='username'>
					{{ruleForm.username}}
				</el-form-item>
				<el-form-item label='用户手机号' prop='mobile'>
					{{ruleForm.mobile}}
				</el-form-item>
				<el-form-item label='反馈类型' prop='feedType'>
					<el-tag>{{ruleForm.feedType}}</el-tag>
				</el-form-item>
				<el-form-item label='反馈时间' prop='addTime'>
					{{ruleForm.addTime}}
				</el-form-item>
				<el-form-item label='反馈内容' prop='content'>
					{{ruleForm.content}}
				</el-form-item>
				<el-form-item v-if='ruleForm.picUrls.length > 0' label='图片' prop='picUrls'>
					<PreviewImg class='prev-img' v-for='item in ruleForm.picUrls' :img-url='item' :key='item' />
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="closeDialog" size="default">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import { viewFeedbackApi} from '/@/api/cms/feedback';
import { StatusEnum} from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';

export default defineComponent({
	name: 'feedbackModal',
	components: {
		PreviewImg
	},
	setup() {
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				username: '',
				mobile: '',
				feedType: '',
				content: '',
				picUrls: [],
				addTime: ''
			},
			rules: {}
		});
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			viewFeedbackApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.ruleForm = res.data;
					state.ruleForm.picUrls = JSON.parse(res.data.picUrls);
				}
			})
		};
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		return {
			...toRefs(state),
			openDialog,
			closeDialog
		}
	}
});
</script>

<style scoped lang='scss'>
	.prev-img{
		margin-right: 10px;
	}
</style>
