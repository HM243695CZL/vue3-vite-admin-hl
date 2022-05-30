<template>
	<div class="system-add-user-container">
		<el-dialog title="新增用户" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="90px" ref="formRef">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="账户名称" prop='username'>
							<el-input v-model="ruleForm.username" placeholder="请输入账户名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="用户昵称" prop='nickname'>
							<el-input v-model="ruleForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="手机号" prop='phone'>
							<el-input v-model="ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="邮箱" prop='email'>
							<el-input v-model="ruleForm.email" placeholder="请输入" clearable></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">新 增</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import {saveUserApi, viewUserApi} from '/@/api/user';
import { reactive, toRefs, onMounted, defineComponent, nextTick, ref } from 'vue';
import { StatusEnum } from '/@/common/status.enum';

// 定义接口来定义对象的类型
interface DeptData {
	deptName: string;
	createTime: string;
	status: boolean;
	sort: number | string;
	describe: string;
	id: number;
	children?: DeptData[];
}
interface UserState {
	isShowDialog: boolean;
	ruleForm: {
		id: string;
		username: string;
		nickname: string;
		phone: string;
		email: string;
	};
	deptData: Array<DeptData>;
}

export default defineComponent({
	name: 'systemAddUser',
	setup() {
		const formRef = ref(null)
		const state = reactive<UserState>({
			isShowDialog: false,
			ruleForm: {
				id: '',
				username: '', // 账户名称
				nickname: '', // 用户昵称
				phone: '', // 手机号
				email: '', // 邮箱
			},
			deptData: [], // 部门数据
		});
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = ''
			if (row) {
				viewUserApi({
					id: row.id
				}).then((res) => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data
					}
				})
			} else {
				nextTick(() => {
					formRef.value.resetFields()
				})
			}
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			saveUserApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					closeDialog()
				}
			})
		};
		// 初始化部门数据
		const initTableData = () => {
			state.deptData.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return {
			formRef,
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			...toRefs(state),
		};
	},
});
</script>
