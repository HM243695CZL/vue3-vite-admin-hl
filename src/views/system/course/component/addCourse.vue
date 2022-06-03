<template>
	<div class='add-course-container'>
		<el-dialog
			title='课程信息'
			v-model='isShowDialog'
			width='45%'
		>
			<el-form :model='ruleForm' size='default' label-width='100px' ref='formRef'>
				<el-form-item label='课程名称' prop='name'>
					<el-input v-model='ruleForm.name' placeholder='请输入课程名称'></el-input>
				</el-form-item>
				<el-form-item label='学分' prop='score'>
					<el-input v-model='ruleForm.score' placeholder='请输入学分'></el-input>
				</el-form-item>
				<el-form-item label='课时' prop='times'>
					<el-input v-model='ruleForm.times' placeholder='请输入课时'></el-input>
				</el-form-item>
				<el-form-item label='上课老师' prop='teacherId'>
					<el-select v-model='ruleForm.teacherId' class='w100'>
						<el-option v-for='item in teacherLists' :key='item.id' :label='item.nickname' :value='item.id'></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class='dialog-footer'>
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { computed, defineComponent, nextTick, reactive, ref, toRefs } from 'vue';
import { viewCourseApi, saveCourseApi } from '/@/api/course';
import { StatusEnum } from '/@/common/status.enum';

export default defineComponent({
	name: 'addCourse',
	props: {
		teacherList: {
			type: Array,
			default: () => [],
		}
	},
	setup (props, ctx) {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '',
				name: '',
				score: '',
				times: '',
				teacherId: ''
			},
		});
		const teacherLists = computed(() => {
			return <any>props.teacherList;
		});
		const onCancel = () => {
			state.isShowDialog = false;
		};
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			if (row) {
				viewCourseApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					formRef.value.resetFields()
				})
			}
		};
		const onSubmit = () => {
			saveCourseApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ctx.emit('refresh-list');
					onCancel();
				}
			})
		};
		return {
			...toRefs(state),
			onCancel,
			openDialog,
			onSubmit,
			formRef,
			teacherLists
		}
	}
});
</script>

<style scoped>

</style>