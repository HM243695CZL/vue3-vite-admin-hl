import request from '/@/utils/request';

export function getMenuPageApi (params: any) {
	return request({
		url: '/menu/page',
		method: 'get',
		params
	})
}
export function getMenuListApi (params: any) {
	return request({
		url: '/menu/list',
		method: 'get',
		params
	})
}
export function saveMenuApi (data: any) {
	return request({
		url: '/menu/create',
		method: 'post',
		data
	})
}
export function viewMenuApi (data: any) {
	return request({
		url: '/menu/view',
		method: 'post',
		data
	})
}
export function deleteMenuApi (data: any) {
	return request({
		url: '/menu/delete',
		method: 'post',
		data
	})
}
export function getMenuIconApi () {
	return request({
		url: '/menu/icons',
		method: 'get'
	})
}
/**
 * 后端控制菜单模拟json，路径在 https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getMenuAdmin 获取后端动态路由菜单(admin)
 * @method getMenuTest 获取后端动态路由菜单(test)
 */
export function useMenuApi() {
	return {
		getMenuAdmin: (params?: object) => {
			return request({
				url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json',
				method: 'get',
				params,
			});
		},
		getMenuTest: (params?: object) => {
			return request({
				url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/testMenu.json',
				method: 'get',
				params,
			});
		},
	};
}

export function getMenuList (){
	return [
		{
			path: '/home',
			name: 'home',
			component: '/home',
			meta: {
				title: '首页',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: true,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'fa fa-home'
			}
		},
		// {
		// 	path: '/dynamicTest',
		// 	name: 'dynamicTest',
		// 	component: '/dynamicTest',
		// 	meta: {
		// 		title: '动态路由测试',
		// 		isLink: '',
		// 		isHide: false,
		// 		isKeepAlive: true,
		// 		isAffix: false,
		// 		isIframe: false,
		// 		roles: ['admin'],
		// 		icon: 'fa fa-home'
		// 	}
		// },
		{
			path: '/system',
			name: 'system',
			component: 'layout',
			redirect: '/system/menu',
			meta: {
				title: '系统设置',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'fa fa-home'
			},
			children: [
				{
					path: '/system/menu',
					name: 'systemMenu',
					component: '/system/menu',
					meta: {
						title: '菜单管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-bars'
					}
				},
				{
					path: '/system/user',
					name: 'systemUser',
					component: '/system/user',
					meta: {
						title: '用户管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-user'
					}
				},
				{
					path: '/system/role',
					name: 'systemRole',
					component: '/system/role',
					meta: {
						title: '角色管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-book'
					}
				},
				{
					path: '/system/file',
					name: 'systemFile',
					component: '/system/file',
					meta: {
						title: '文件管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-file-o'
					}
				},
				{
					path: '/system/course',
					name: 'systemCourse',
					component: '/system/course',
					meta: {
						title: '课程管理',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-list'
					}
				},
				{
					path: '/system/dynamic/:id',
					name: 'dynamicDetail',
					component: '/system/dynamic',
					meta: {
						title: '动态详情',
						isLink: '',
						isHide: true,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin'],
						icon: 'fa fa-bars'
					}
				}
			]
		}
	]
}