import request from '/@/utils/request';

export function getUserPageApi (params: any) {
	return request({
		url: '/user/page',
		method: 'get',
		params
	})
}
export function saveUserApi (data: any) {
	return request({
		url: '/user/create',
		method: 'post',
		data
	})
}
export function viewUserApi (data: any) {
	return request({
		url: '/user/view',
		method: 'post',
		data
	})
}
export function deleteUserApi (data: any) {
	return request({
		url: '/user/delete',
		method: 'post',
		data
	})
}
export function loginApi (data: any) {
	return request({
		url: '/user/login',
		method: 'post',
		data
	})
}
export function getUserInfoApi (data: any) {
	return request({
		url: '/user/userInfo',
		method: 'post',
		data
	})
}
export function getUsersByRoleIdApi (params: any) {
	return request({
		url: '/user/getUsersByRoleId',
		method: 'get',
		params
	})
}
export function getUserCourseInfoApi (params: any) {
	return request({
		url: '/user/getCourseInfo',
		method: 'get',
		params
	})
}