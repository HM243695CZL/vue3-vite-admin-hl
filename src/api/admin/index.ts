import request from '/@/utils/request';
const preUrl = '/admin/admin/'
export function getAdminPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function saveAdminApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateAdminApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewAdminApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteAdminApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get',
	})
}

export function loginApi (data: any) {
	return request({
		url: `${preUrl}login`,
		method: 'post',
		data
	})
}

export function updatePassApi (data: any) {
	return request({
		url: `${preUrl}updatePass`,
		method: 'post',
		data
	})
}
