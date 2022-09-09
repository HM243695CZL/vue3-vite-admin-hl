import request from '/@/utils/request';
const preUrl = '/admin/ums/dict/';

export function getDictPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function saveDictApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function getDictListApi (data: any) {
	return request({
		url: `${preUrl}list`,
		method: 'post',
		data
	})
}

export function updateDictApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewDictApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteDictApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}
