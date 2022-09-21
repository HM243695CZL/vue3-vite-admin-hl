<template>
	<div class='cms-address-container'>
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
							<el-form-item label='收货人名称'>
								<el-input v-model='name' size='default' placeholder='请输入收货人名称' clearable></el-input>
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
				<el-table-column prop='username' label='用户名称' />
				<el-table-column prop='name' label='收货人名称' show-overflow-tooltip />
				<el-table-column prop='tel' label='手机号码' />
				<el-table-column prop='province' label='区域地址' show-overflow-tooltip>
					<template #default='scope'>
						{{scope.row.province}}{{scope.row.city}}{{scope.row.county}}
					</template>
				</el-table-column>
				<el-table-column prop='addressDetail' label='详细地址' show-overflow-tooltip />
				<el-table-column prop='isDefault' label='是否默认'>
					<template #default='scope'>
						<el-tag>{{scope.row.isDefault ? '是' : '否'}}</el-tag>
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
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getAddressPageApi } from '/@/api/cms/address';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'cmsAddress',
	setup() {
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			dataList: [],
			total: 0,
			username: '',
			name: ''
		});
		const getAddressList = () => {
			getAddressPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				username: state.username,
				name: state.name
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex = 1;
			getAddressList();
		}
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getAddressList();
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getAddressList();
		};
		onMounted(() => {
			getAddressList();
		});
		return {
			...toRefs(state),
			getAddressList,
			onHandleSizeChange,
			onHandleCurrentChange,
			clickSearch
		}
	}
});
</script>

<style scoped>

</style>
