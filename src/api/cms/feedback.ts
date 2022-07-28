import request from '/@/utils/request';
const preUrl = '/admin/cms/feedback/';

export function getFeedbackPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}


export function deleteFeedbackApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}


export function viewFeedbackApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}
