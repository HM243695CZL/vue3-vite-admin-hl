import request from '/@/utils/request';
const preUrl = '/admin/pms/comment/';

export function getCommentPageApi(data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}


export function deleteCommentApi(params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}
