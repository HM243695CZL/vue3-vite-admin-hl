<template>
	<div class='cms-footprint-container'>
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
							<el-form-item label='商品名称'>
								<el-input v-model='goodsName' size='default' placeholder='请输入商品名称' clearable></el-input>
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
				<el-table-column type='index' label='序号' width='80' />
				<el-table-column prop='username' label='用户名称' show-overflow-tooltip />
				<el-table-column prop='goodsName' label='商品名称' show-overflow-tooltip />
				<el-table-column prop='picUrl' label='商品图片'>
					<template #default='scope'>
						<PreviewImg :img-url='scope.row.picUrl' />
					</template>
				</el-table-column>
				<el-table-column prop='addTime' label='添加时间' />
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
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getFootprintPageApi } from '/@/api/cms/footprint';
import { StatusEnum } from '/@/common/status.enun';
import PreviewImg from '/@/components/previewImg/index.vue';

export default defineComponent({
	name: 'cmsFootprint',
	components: {
		PreviewImg
	},
	setup() {
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
			username: '',
			goodsName: ''
		});
		const getFootprintList = () => {
			getFootprintPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				username: state.username,
				goodsName: state.goodsName
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex = 1;
			getFootprintList();
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getFootprintList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getFootprintList();
		};
		onMounted(() => {
			getFootprintList();
		})
		return {
			...toRefs(state),
			getFootprintList,
			onHandleSizeChange,
			onHandleCurrentChange,
			clickSearch
		}
	}
});
</script>

<style scoped>

</style>
