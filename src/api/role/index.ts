import request from '/@/utils/request';

export function getRolePageApi (params: any) {
	return request({
		url: '/role/page',
		method: 'get',
		params
	})
}

export function saveRoleApi (data: any) {
	return request({
		url: '/role/create',
		method: 'post',
		data
	})
}

export function updateRoleApi (data: any) {
	return request({
		url: '/role/update',
		method: 'post',
		data
	})
}

export function viewRoleApi (params: any) {
	return request({
		url: '/role/view/' + params.id,
		method: 'get'
	})
}

export function deleteRoleApi (params: any) {
	return request({
		url: '/role/delete/' + params.id,
		method: 'get'
	})
}
