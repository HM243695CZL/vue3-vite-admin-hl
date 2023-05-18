<template>
	<el-form ref='formRef' :rules='rules' :model="ruleForm" size="large" class="login-content-form">
		<el-form-item class="login-animation1" prop='username'>
			<el-input type="text" v-model="ruleForm.username" clearable autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-User /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation2" prop='password'>
			<el-input :type="isShowPassword ? 'text' : 'password'" v-model="ruleForm.password" autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon"><ele-Unlock /></el-icon>
				</template>
				<template #suffix>
					<i
						class="iconfont el-input__icon login-content-password"
						:class="isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'"
						@click="isShowPassword = !isShowPassword"
					>
					</i>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item class="login-animation4">
			<el-button type="primary" class="login-content-submit" round @click="onSignIn">
				<span>登 录</span>
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script lang="ts">
import { toRefs, reactive, defineComponent, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { initFrontEndControlRoutes } from '/@/router/frontEnd';
import { useStore } from '/@/store/index';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { loginApi } from '/@/api/admin';
import { StatusEnum } from '/@/common/status.enun';

export default defineComponent({
	name: 'loginAccount',
	setup() {
		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		const formRef = ref();
		const state = reactive({
			isShowPassword: false,
			ruleForm: {
				username: '',
				password: '',
			},
			rules: {
				username: [
					{ required: true, message: '用户名不能为空', trigger: 'blur'}
				],
				password: [
					{ required: true, message: '密码不能为空', trigger: 'blur'}
				]
			},
		});
		// 时间获取
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		// 登录
		const onSignIn = async () => {
			// 模拟数据
			formRef.value.validate((valid: boolean) => {
				if (valid) {
					loginApi({
						username: state.ruleForm.username,
						password: state.ruleForm.password
					}).then(async res => {
						if (res.status === StatusEnum.SUCCESS) {
							// 存储 token 到浏览器缓存
							Session.set('token', res.data.token);
							Session.set('menuList', res.data.menuList);
							// 存储用户信息到浏览器缓存
							const {id, avatar, roles, username} = res.data.userInfo;
							// 用户信息模拟数据
							const userInfos = {
								id,
								userName: username,
								photo: avatar,
								time: new Date().getTime(),
								roles,
								authBtnList: [],
							};
							Session.set('userInfo', userInfos);
							// 1、请注意执行顺序(存储用户信息到vuex)
							// 前端控制路由，2、请注意执行顺序
							await initFrontEndControlRoutes();
							signInSuccess();
							store.dispatch('userInfos/setUserInfos', userInfos);
						}
					})
				}
			})
		};
		// 登录成功后的跳转
		const signInSuccess = () => {
			// 初始化登录成功时间问候语
			let currentTimeInfo = currentTime.value;
			// 登录成功，跳到转首页
			// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
			// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
			if (route.query?.redirect) {
				router.push({
					path: <string>route.query?.redirect,
					query: Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : '',
				});
			} else {
				router.push('/');
			}
			// 登录成功提示
			const signInText = '欢迎回来！';
			ElMessage.success(`${currentTimeInfo}，${signInText}`);
		};
		return {
			onSignIn,
			formRef,
			...toRefs(state),
		};
	},
});
</script>

<style scoped lang="scss">
.login-content-form {
	margin-top: 20px;
	@for $i from 1 through 4 {
		.login-animation#{$i} {
			opacity: 0;
			animation-name: error-num;
			animation-duration: 0.5s;
			animation-fill-mode: forwards;
			animation-delay: calc($i/10) + s;
		}
	}
	.login-content-password {
		display: inline-block;
		width: 20px;
		cursor: pointer;
		&:hover {
			color: #909399;
		}
	}
	.login-content-code {
		width: 100%;
		padding: 0;
		font-weight: bold;
		letter-spacing: 5px;
	}
	.login-content-submit {
		width: 100%;
		letter-spacing: 2px;
		font-weight: 300;
		margin-top: 15px;
	}
}
</style>
