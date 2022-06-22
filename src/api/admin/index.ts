import request from '/@/utils/request';

export function getAdminPageApi (data: any) {
	return request({
		url: '/admin/page',
		method: 'post',
		data
	})
}

export function saveAdminApi (data: any) {
	return request({
		url: '/admin/create',
		method: 'post',
		data
	})
}

export function updateAdminApi (data: any) {
	return request({
		url: '/admin/update',
		method: 'post',
		data
	})
}

export function viewAdminApi (params: any) {
	return request({
		url: '/admin/view/' + params.id,
		method: 'get'
	})
}

export function deleteAdminApi (params: any) {
	return request({
		url: '/admin/delete/' + params.id,
		method: 'get',
	})
}

export function loginApi (data: any) {
	return request({
		url: '/admin/login',
		method: 'post',
		data
	})
}
