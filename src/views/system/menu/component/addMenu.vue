<template>
	<div class="system-add-menu-container">
		<el-dialog title="操作菜单" v-model="isShowDialog" width="1200px" :close-on-click-modal='false'>
			<el-form :model="ruleForm" ref='formRef' :rules='rules' size="default" label-width="80px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="上级菜单" prop='pid'>
							<el-select v-model='ruleForm.pid' clearable class='w100'>
								<el-option v-for='item of menuList' :key='item.id' :label='item.title' :value='item.id'></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单名称" prop='title'>
							<el-input v-model="ruleForm.title" placeholder="菜单名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单地址" prop='path'>
							<el-input v-model="ruleForm.path" placeholder="菜单地址" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="路由名称" prop='name'>
							<el-input v-model="ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="组件地址" prop='component'>
							<el-input v-model="ruleForm.component" placeholder="组件地址" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="所属角色" prop='roles'>
							<el-select v-model="ruleForm.roleIds" multiple placeholder="请选择角色" clearable class="w100">
								<el-option v-for='item of roleList' :key='item.id' :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单图标" prop='icon'>
							<IconSelector placeholder="请输入菜单图标" v-model="ruleForm.icon" type="all" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="菜单排序" prop='sort'>
							<el-input v-model="ruleForm.sort" placeholder="请输入排序" class="w100" />
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否隐藏" prop='isHide'>
							<el-radio-group v-model="ruleForm.isHide">
								<el-radio :label="true">隐藏</el-radio>
								<el-radio :label="false">不隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="页面缓存" prop='isKeepAlive'>
							<el-radio-group v-model="ruleForm.isKeepAlive">
								<el-radio :label="true">缓存</el-radio>
								<el-radio :label="false">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否固定" prop='isAffix'>
							<el-radio-group v-model="ruleForm.isAffix">
								<el-radio :label="true">固定</el-radio>
								<el-radio :label="false">不固定</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">确 定</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted, defineComponent, nextTick, ref } from 'vue';
import IconSelector from '/@/components/iconSelector/index.vue';
import { getRoleListApi } from '/@/api/role';
import { saveMenuApi, updateMenuApi, getMenuListApi, viewMenuApi} from '/@/api/menu';
import { StatusEnum } from '/@/common/status.enun';
import { ElMessage } from 'element-plus';

export default defineComponent({
	name: 'systemAddMenu',
	components: { IconSelector },
	setup() {
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			ruleForm: {
				id: '', // 菜单id
				pid: '', // 上级菜单
				path: '', // 菜单地址
				name: '', // 组件名称
				title: '', // 菜单名称
				icon: '', // 菜单图标
				component: '', // 组件路径
				sort: '',
				isHide: false, // 是否隐藏
				isKeepAlive: true, // 是否缓存
				isAffix: false, // 是否固定
				isLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink:true 2、链接地址不为空`
				isIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、链接地址不为空`
				roleIds: [], // 权限标识，取角色管理
			},
			rules: {
				path: [
					{ required: true, message: '菜单地址不能为空', trigger: 'blur'}
				],
				name: [
					{ required: true, message: '组件名称不能为空', trigger: 'blur'}
				],
				title: [
					{ required: true, message: '菜单名称不能为空', trigger: 'blur'}
				],
				component: [
					{ required: true, message: '组件地址不能为空', trigger: 'blur'}
				]
			},
			menuList: [], // 上级菜单数据
			roleList: []
		});
		const getRoleList = () => {
			getRoleListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.roleList = res.data;
				}
			})
		};
		const getMenuList = () => {
			getMenuListApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.menuList = res.data;
				}
			})
		};
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			getRoleList();
			getMenuList();
			if (row) {
				viewMenuApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
					}
				})
			} else {
				nextTick(() => {
					formRef.value.resetFields();
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
			saveMenuApi(state.ruleForm).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ElMessage.success("操作成功");
					closeDialog();
				}
			})
		};
		// 页面加载时
		onMounted(() => {
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
