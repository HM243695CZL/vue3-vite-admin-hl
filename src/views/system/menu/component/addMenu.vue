<template>
	<div class="system-add-menu-container">
		<el-dialog title="新增菜单" v-model="isShowDialog" width="769px">
			<el-form :model="ruleForm" size="default" label-width="80px" ref='formRef'>
				<el-row :gutter="35">
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="上级菜单" prop='pid'>
							<el-cascader
								:options="menuData"
								:props="{ checkStrictly: true, value: 'id', label: 'title' }"
								placeholder="请选择上级菜单"
								clearable
								class="w100"
								v-model="ruleForm.pid"
							>
								<template #default="{ node, data }">
									<span>{{ data.title }}</span>
								</template>
							</el-cascader>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单名称" prop='title'>
							<el-input v-model="ruleForm.title" placeholder="菜单名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="路由名称" prop='name'>
							<el-input v-model="ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="路由路径" prop='path'>
							<el-input v-model="ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="组件路径" prop='component'>
							<el-input v-model="ruleForm.component" placeholder="组件路径" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="链接地址" prop='isLink'>
							<el-input v-model="ruleForm.isLink" placeholder="链接地址" clearable>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="菜单图标" prop='icon'>
							<div class='flex-start'>
								<i class='mr20' :class='ruleForm.icon'></i>
								<el-select class='w100' v-model='ruleForm.icon' placeholder='请选择图标'>
									<el-option v-for='item in iconList' :key='item.name' :label='item.name' :value='item.value'>
										<i class='mr20' :class='item.value'></i>{{item.name}}
									</el-option>
								</el-select>
							</div>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="是否隐藏" prop='isHide'>
							<el-radio-group v-model="ruleForm.isHide">
								<el-radio :label="1">隐藏</el-radio>
								<el-radio :label="0">不隐藏</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="页面缓存" prop='isKeepAlive'>
							<el-radio-group v-model="ruleForm.isKeepAlive">
								<el-radio :label="1">缓存</el-radio>
								<el-radio :label="0">不缓存</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="是否固定" prop='isAffix'>
							<el-radio-group v-model="ruleForm.isAffix">
								<el-radio :label="1">固定</el-radio>
								<el-radio :label="0">不固定</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
						<el-form-item label="是否内嵌" prop='isIframe'>
							<el-radio-group v-model="ruleForm.isIframe">
								<el-radio :label="1">是</el-radio>
								<el-radio :label="0">否</el-radio>
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
import { useStore } from '/@/store/index';
import IconSelector from '/@/components/iconSelector/index.vue';
import { saveMenuApi, viewMenuApi, getMenuListApi, getMenuIconApi } from '/@/api/menu';
import { StatusEnum } from '/@/common/status.enum';
// import { setBackEndControlRefreshRoutes } from "/@/router/backEnd";
export default defineComponent({
	name: 'systemAddMenu',
	components: { IconSelector },
	setup(props, ctx) {
		const store = useStore();
		const formRef = ref();
		const state = reactive({
			isShowDialog: false,
			iconList: [],
			// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
			ruleForm: {
				id: '',
				pid: [] as any,
				name: '', // 路由名称
				component: '', // 组件路径
				path: '', // 路由路径
				title: '', // 菜单名称
				icon: '', // 菜单图标
				isHide: 0, // 是否隐藏
				isKeepAlive: 1, // 是否缓存
				isAffix: 0, // 是否固定
				isLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink:true 2、链接地址不为空`
				isIframe: 0, // 是否内嵌，开启条件，`1、isIframe:true 2、链接地址不为空`
			},
			menuData: [], // 上级菜单数据
		});
		// 获取菜单数据
		const getMenuList = () => {
			getMenuListApi({}).then(res =>{
				if (res.status === StatusEnum.SUCCESS) {
					state.menuData = res.data;
				}
			})
		}
		// 获取菜单图标
		const getMenuIconList = () => {
			getMenuIconApi().then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					state.iconList = res.data;
				}
			})
		}
		// 打开弹窗
		const openDialog = (row: any) => {
			state.isShowDialog = true;
			state.ruleForm.id = '';
			getMenuList();
			getMenuIconList();
			if (row) {
				// 编辑
				viewMenuApi({
					id: row.id
				}).then(res => {
					if (res.status === StatusEnum.SUCCESS) {
						state.ruleForm = res.data;
						state.ruleForm.pid = [res.data.pid]
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
			// setBackEndControlRefreshRoutes() // 刷新菜单，未进行后端接口测试
			saveMenuApi({
				...state.ruleForm,
				pid: state.ruleForm.pid[state.ruleForm.pid.length - 1]
			}).then(res => {
				if (res.status === StatusEnum.SUCCESS) {
					ctx.emit('refresh-list');
					closeDialog(); // 关闭弹窗
				}
			})
		};
		// 页面加载时
		onMounted(() => {
		});
		return {
			openDialog,
			closeDialog,
			onCancel,
			onSubmit,
			formRef,
			...toRefs(state),
		};
	},
});
</script>
