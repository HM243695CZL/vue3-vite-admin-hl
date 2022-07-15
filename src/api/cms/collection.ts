import request from '/@/utils/request';
const preUrl = '/admin/cms/collection/';

export function getCollectionPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function getCollectionListApi () {
	return request({
		url: `${preUrl}list`,
		method: 'get'
	})
}
