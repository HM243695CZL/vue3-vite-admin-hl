import request from '/@/utils/request';
const preUrl = '/admin/pms/issue/';

export function getIssueListApi () {
	return request({
		url: preUrl + 'list',
		method: 'get'
	})
}

export function getIssuePageApi (data: any) {
	return request({
		url: preUrl + 'page',
		method: 'post',
		data
	})
}

export function saveIssueAPi (data: any) {
	return request({
		url: preUrl + 'create',
		method: 'post',
		data
	})
}

export function updateIssueApi (data: any) {
	return request({
		url: preUrl + 'update',
		method: 'post',
		data
	})
}

export function viewIssueAPi (params: any) {
	return request({
		url: preUrl + 'view/' + params.id,
		method: 'get'
	})
}

export function deleteIssueApi (params: any) {
	return request({
		url: preUrl + 'delete/' + params.id,
		method: 'get'
	})
}
