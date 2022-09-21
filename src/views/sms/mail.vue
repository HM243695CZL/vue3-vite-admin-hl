<template>
	<div class='sms-mail-container'>
		<el-card shadow="hover">
			<div class='system-user-search mb15'>
				<el-form inline label-width='100px'>
					<el-row :gutter='20'>
						<el-col :span='6'>
							<el-form-item label='收件人'>
								<el-input v-model='to' size='default' placeholder='请输入收件人' clearable></el-input>
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
				<el-table-column type='expand'>
					<template #default='scope'>
						<div class='mail'>
							<div class='title'>发送内容：</div>
							<div class='content'>{{scope.row.content}}</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop='subject' label='邮件标题' />
				<el-table-column prop='from' label='发件人' />
				<el-table-column prop='to' label='收件人' />
				<el-table-column prop='addTime' label='发送时间' />
			</el-table>
		</el-card>
	</div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getMailPageApi} from '/@/api/sms/mail';
import { StatusEnum} from '/@/common/status.enun';

export default defineComponent({
	name: 'smsMail',
	setup() {
		const state = reactive({
			pageIndex: 1,
			pageSize: 10,
			total: 0,
			dataList: [],
			to: ''
		});
		const getMailList = () => {
			getMailPageApi({
				pageIndex: state.pageIndex,
				pageSize: state.pageSize,
				to: state.to
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.dataList = res.data.list;
					state.total = res.data.total;
				}
			})
		};
		const clickSearch = () => {
			state.pageIndex  =1;
			getMailList();
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.pageSize = val;
			state.pageIndex = 1;
			getMailList()
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.pageIndex = val;
			getMailList()
		};
		onMounted(() => {
			getMailList()
		});
		return {
			getMailList,
			onHandleSizeChange,
			onHandleCurrentChange,
			...toRefs(state),
			clickSearch
		}
	}
});
</script>

<style scoped lang='scss'>
	.sms-mail-container{
		.mail{
			padding: 20px;
			.title{
				font-weight: 700;
				margin-bottom: 10px;
			}
			.content{
				white-space: break-spaces;
			}
		}
	}
</style>
