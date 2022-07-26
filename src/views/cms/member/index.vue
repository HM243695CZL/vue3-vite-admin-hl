<template>
	<div class='cms-member-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-input size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-button size="default" type="primary" class="ml10" @click='getMemberList'>
					查询
				</el-button>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='80' />
				<el-table-column prop='id' label='用户ID' show-overflow-tooltip />
				<el-table-column prop='nickname' label='用户昵称' show-overflow-tooltip />
				<el-table-column prop='avatar' label='用户头像' show-overflow-tooltip>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.avatar' />
					</template>
				</el-table-column>
				<el-table-column prop='mobile' label='手机号' show-overflow-tooltip />
				<el-table-column prop='gender' label='性别'>
					<template #default='scope'>
						{{genderObj[scope.row.gender]}}
					</template>
				</el-table-column>
				<el-table-column prop='birthday' label='生日' show-overflow-tooltip />
				<el-table-column prop='userLevel' label='用户等级' show-overflow-tooltip>
					<template #default='scope'>
						{{userLevelObj[scope.row.userLevel]}}
					</template>
				</el-table-column>
				<el-table-column prop='status' label='状态'>
					<template #default='scope'>
						<el-tag>{{statusObj[scope.row.status]}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click="onOpenEditMember(scope.row)">详情</el-button>
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
		</el-card>
		<MemberModal ref='memberModalRef' @refresh-list='getMemberList' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { getMemberPageApi } from '/@/api/cms/member';
import { StatusEnum } from '/@/common/status.enun';
import MemberModal from '/@/views/cms/member/component/memberModal.vue';
import PreviewImg from '/@/components/previewImg/index.vue';


export default defineComponent({
	name: 'cmsMember',
	components: {
		PreviewImg,
		MemberModal
	},
	setup() {
		const memberModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
			userLevelObj: {
				0: '普通用户',
				1: 'VIP用户',
				2: '高级VIP'
			},
			genderObj: {
				0: '未知',
				1: '男',
				2: '女'
			},
			statusObj: {
				0: '可用',
				1: '禁用',
				2: '注销'
			}
		});
		const getMemberList = () => {
			getMemberPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const onOpenEditMember = (row: any) => {
			memberModalRef.value.openDialog(row);
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getMemberList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getMemberList();
		};
		onMounted(() => {
			getMemberList();
		});
		return {
			...toRefs(state),
			getMemberList,
			onOpenEditMember,
			onHandleSizeChange,
			onHandleCurrentChange,
			memberModalRef
		}
	}
});
</script>

<style scoped>

</style>
