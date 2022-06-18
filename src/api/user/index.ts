import request from '/@/utils/request';

export function getUserPageApi (data: any) {
	return request({
		url: '/user/page',
		method: 'post',
		data
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
