import request from '/@/utils/request';
const preUrl = '/pms/attr/cate/';

export function getGoodsAttrCatePageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function saveGoodsAttrCateApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateGoodsAttrCateApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function deleteGoodsAttrCateApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}
