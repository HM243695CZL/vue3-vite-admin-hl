import request from '/@/utils/request';

export function getFilePageApi (params: any) {
	return request({
		url: '/file/page',
		method: 'get',
		params
	})
}

export function deleteFileApi (data: any) {
	return request({
		url: '/file/delete',
		method: 'post',
		data
	})
}