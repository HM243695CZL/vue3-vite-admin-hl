<template>
	<div class='view-selected-course'>
		<el-dialog
			title='已选课程'
			v-model='isShowDialog'
			width='45%'
		>
			<el-table :data='courseInfoList'>
				<el-table-column prop='name' label='课程名称'></el-table-column>
				<el-table-column prop='score' label='学分'></el-table-column>
			</el-table>
			<template #footer>
				<span class='dialog-footer'>
					<el-button @click="onCancel" size="default">关闭</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from 'vue';
import { getStudentCourseInfoApi } from '/@/api/user';
import { StatusEnum } from '/@/common/status.enum';

export default defineComponent({
	name: 'viewSelectedCourseModel',
	setup () {
		const state = reactive({
			isShowDialog: false,
			courseInfoList: []
		});
		const onCancel = () => {
			state.isShowDialog = false
		};
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			getStudentCourseInfoApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.courseInfoList = res.data;
				}
			})
		}
		return {
			...toRefs(state),
			onCancel,
			openDialog
		}
	}
});
</script>

<style scoped>

</style>