<template>
	<div class='system-course-container'>
		<el-card shadow='hover'>
			<el-button size='default' type='primary' class='ml10' @click='addCourse'>新增</el-button>
			<el-button size='default' type='default' class='ml10' @click='getCoursePageList'>查询</el-button>
			<el-table :data='dataList'>
				<el-table-column label='课程名称' prop='name'></el-table-column>
				<el-table-column label='分数' prop='score'></el-table-column>
				<el-table-column label='课时' prop='times'></el-table-column>
				<el-table-column label='授课老师' prop='teacher'></el-table-column>
				<el-table-column label='操作' width='220'>
					<template #default='scope'>
						<el-button size='small' type='default' @click='selectCourse(scope.row)'>选课</el-button>
						<el-button size='small' type='default' @click='handleEdit(scope.row)'>修改</el-button>
						<el-button size='small' type='default' @click='handleDelete(scope.row)'>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="pageIndex"
				background
				v-model:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="total"
			>
			</el-pagination>
			<add-course-model :teacher-list='teacherList' ref='addCourseRef' @refresh-list='getCoursePageList' />
		</el-card>
	</div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getCoursePageApi, setStudentCourseApi } from '/@/api/course';
import { getUsersByRoleIdApi } from '/@/api/user';
import { StatusEnum } from '/@/common/status.enum';
import AddCourseModel from './component/addCourse.vue';
import { store } from '/@/store';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemCourse',
	components: {
		AddCourseModel
	},
	setup () {
		const addCourseRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
			teacherList: []
		});
		// 获取用户信息 vuex
		const getUserInfos = computed(() => {
			return <any>store.state.userInfos.userInfos;
		});
		const getUsersByRoleIdList = () => {
			getUsersByRoleIdApi({
				roleId: 5
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.teacherList = res.data;
				}
			})
		}
		const getCoursePageList = () => {
			getCoursePageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.records;
					state.total = res.data.total;
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			getCoursePageList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getCoursePageList();
		};
		const addCourse = () => {
			console.log(getUserInfos);
			addCourseRef.value.openDialog()
		};
		const selectCourse = (row: any) => {
			setStudentCourseApi({
				studentId: getUserInfos.value.id,
				courseId: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("选课成功")
				}
			})
		};
		const handleEdit = (row: any) => {
			addCourseRef.value.openDialog(row);
		};
		const handleDelete = () => {

		};
		onMounted(() => {
			getCoursePageList();
			getUsersByRoleIdList()
		})
		return {
			...toRefs(state),
			addCourseRef,
			addCourse,
			selectCourse,
			getCoursePageList,
			onHandleSizeChange,
			onHandleCurrentChange,
			handleEdit,
			handleDelete,
			getUsersByRoleIdList
		}
	}
});
</script>

<style scoped>

</style>