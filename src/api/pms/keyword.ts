import request from '/@/utils/request';
const preUrl = '/admin/pms/keyword/';

export function getKeywordPageApi (data: any) {
	return request({
		url: preUrl + 'page',
		method: 'post',
		data
	})
}

export function saveKeywordApi (data: any) {
	return request({
		url: preUrl + 'create',
		method: 'post',
		data
	})
}

export function updateKeywordApi (data: any) {
	return request({
		url: preUrl + 'update',
		method: 'post',
		data
	})
}

export function viewKeywordApi (params: any) {
	return request({
		url: preUrl + 'view/' + params.id,
		method: 'get'
	})
}

export function deleteKeywordApi (params: any) {
	return request({
		url: preUrl + 'delete/' + params.id,
		method: 'get'
	})
}
