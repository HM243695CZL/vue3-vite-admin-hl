<template>
	<div class='product-comment-container'>
		<el-card shadow="hover">
			<div class="system-user-search mb15">
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='商品名称'>
								<el-input v-model='goodsName' size="default" placeholder="请输入商品名称"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='用户名'>
								<el-input v-model='username' size="default" placeholder="请输入用户名"> </el-input>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-form-item label='评分'>
								<el-select size='default' v-model='star' placeholder='请选择评分' clearable>
									<el-option v-for='item in 5' :key='item' :label='item + "分"' :value='item'></el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span='6'>
							<el-button size="default" type="primary" class="ml10" @click='getCommentList'>
								查询
							</el-button>
						</el-col>
					</el-row>
				</el-form>
			</div>
			<el-table :data='dataList'>
				<el-table-column type='index' label='序号' width='60' />
				<el-table-column prop='username' label='用户名' show-overflow-tooltip />
				<el-table-column prop='goodsName' label='商品名称' show-overflow-tooltip />
				<el-table-column prop='star' label='评分' show-overflow-tooltip>
					<template #default='scope'>
						<el-tag v-if='scope.row.star >= 3'>{{scope.row.star}}分</el-tag>
						<el-tag v-else type='danger'>{{scope.row.star}}分</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop='content' label='评论内容' show-overflow-tooltip />
				<el-table-column prop='picUrls' label='评论图片'>
					<template #default='scope'>
						<div class='preview-box flex-start' v-if='JSON.parse(scope.row.picUrls).length > 0'>
							<PreviewImg :img-url='item' v-for='item in JSON.parse(scope.row.picUrls)' :key='item'></PreviewImg>
						</div>
						<div class='no-data' v-else>无</div>
					</template>
				</el-table-column>
				<el-table-column prop='addTime' label='时间' show-overflow-tooltip />
				<el-table-column label='操作' width='200'>
					<template #default='scope'>
						<el-button v-if='scope.row.adminContent === ""' size='small' type='default' @click='handleReply(scope.row)'>回复</el-button>
						<el-button v-else size='small' type='default' @click='viewReply(scope.row)'>查看回复</el-button>
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
			<CommentModal ref='commentModalRef'></CommentModal>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { getCommentPageApi, deleteCommentApi } from '/@/api/pms/comment';
import { StatusEnum } from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';
import CommentModal from '/@/views/product/comment/component/commentModal.vue';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'productComment',
	components: {
		PreviewImg,
		CommentModal
	},
	setup() {
		const commentModalRef = ref();
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			goodsName: '',
			username: '',
			star: null
		});
		const getCommentList = () => {
			getCommentPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				goodsName: state.goodsName,
				username: state.username,
				star: state.star
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const handleReply = (row: any) => {
			commentModalRef.value.openDialog(row, false);
		};
		const viewReply = (row: any) => {
			commentModalRef.value.openDialog(row, true);
		};
		const handleDelete = (row: any) => {
			deleteCommentApi({
				id: row.id
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success('删除成功');
					getCommentList();
				}
			})
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getCommentList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getCommentList();
		};
		onMounted(() => {
			getCommentList();
		});
		return {
			getCommentList,
			onHandleSizeChange,
			onHandleCurrentChange,
			handleDelete,
			handleReply,
			viewReply,
			...toRefs(state),
			commentModalRef
		}
	}
});
</script>

<style scoped lang='scss'>
	.product-comment-container{
		.preview-box{
			.preview-img-container{
				margin-right: 15px;
			}
		}
		.no-data{
			color: #ccc;
		}
	}
</style>
