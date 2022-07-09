import request from '/@/utils/request';
const preUrl = '/admin/role/';
export function getRolePageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function getRoleListApi () {
	return request({
		url: `${preUrl}list`,
		method: 'get'
	})
}

export function saveRoleApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateRoleApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewRoleApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteRoleApi (params: any) {
	return request({
		url: `${preUrl}delete` + params.id,
		method: 'get'
	})
}

export function saveAuthApi (data: any) {
	return request({
		url: `${preUrl}auth`,
		method: 'post',
		data
	})
}

export function viewAuthApi( params: any) {
	return request({
		url: `${preUrl}viewAuth/` + params.id,
		method: 'get'
	})
}
