<template>
	<div class='cmd-feedback-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='用户名称'>
								<el-input v-model='username' size='default' placeholder='请输入用户名称' clearable></el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='反馈类型'>
								<el-select v-model='feedType' placeholder='请选择' size='default' clearable>
									<el-option v-for='item in feedTypeList' :key='item' :label='item' :value='item'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-button size="default" type="primary" class="ml10" @click='clickSearch'>
								查询
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='60' />
				<el-table-column prop='username' label='用户名称' show-overflow-tooltip />
				<el-table-column prop='mobile' label='手机号' show-overflow-tooltip />
				<el-table-column prop='hasPicture' label='是否有图片'>
					<template #default='scope'>
						<el-tag type='success' v-if='scope.row.hasPicture'>是</el-tag>
						<el-tag v-else>否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='feedType' label='反馈类型' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag>{{scope.row.feedType}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='addTime' label='反馈时间' show-overflow-tooltip />
				<el-table-column label="操作" width="200">
					<template #default="scope">
						<el-button size="small" type="default" @click='onOpenViewFeedback(scope.row)'>查看</el-button>
						<el-button size="small" type="default" @click='deleteFeedback(scope.row)'>删除</el-button>
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
		<FeedbackModal ref='feedbackModalRef' />
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs, ref } from 'vue';
import { getFeedbackPageApi, deleteFeedbackApi} from '/@/api/cms/feedback';
import { StatusEnum} from '/@/common/status.enun';
import { ElMessage } from 'element-plus';
import FeedbackModal from '/@/views/cms/feedback/component/feedbackModal.vue';

export default defineComponent({
	name: 'cmsFeedback',
	components: {
		FeedbackModal
	},
	setup() {
		const feedbackModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			username: '',
			feedType: '',
			feedTypeList:  ['商品相关', '功能异常', '优化建议', '其他']
		});
		const getFeedbackList = () => {
			getFeedbackPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				username: state.username,
				feedType: state.feedType
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex = 1;
			getFeedbackList();
		};
		const onOpenViewFeedback = (row: any) => {
			feedbackModalRef.value.openDialog(row);
		};
		const deleteFeedback = (row: any) => {
			deleteFeedbackApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("删除成功");
					getFeedbackList();
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getFeedbackList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getFeedbackList();
		};
		onMounted(() => {
			getFeedbackList();
		});
		return {
			...toRefs(state),
			feedbackModalRef,
			getFeedbackList,
			deleteFeedback,
			onHandleSizeChange,
			onHandleCurrentChange,
			onOpenViewFeedback,
			clickSearch
		}
	}
});
</script>

<style scoped lang='less'>

</style>
