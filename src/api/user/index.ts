import request from '/@/utils/request';
const preUrl = '/admin/user/';
export function getUserPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}
export function saveUserApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}
export function viewUserApi (data: any) {
	return request({
		url: `${preUrl}view`,
		method: 'post',
		data
	})
}
export function deleteUserApi (data: any) {
	return request({
		url: `${preUrl}delete`,
		method: 'post',
		data
	})
}
