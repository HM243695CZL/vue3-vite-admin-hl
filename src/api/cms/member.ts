import request from '/@/utils/request';
const preUrl = '/wx/cms/user/';
export function getMemberPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}


export function viewMemberApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function updateMemberApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}
