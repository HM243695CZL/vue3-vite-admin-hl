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
export function viewRoleApi (data: any) {
	return request({
		url: '/role/view',
		method: 'post',
		data
	})
}
export function deleteRoleApi (data: any) {
	return request({
		url: '/role/delete',
		method: 'post',
		data
	})
}