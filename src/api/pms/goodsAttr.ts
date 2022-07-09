import request from '/@/utils/request';
const preUrl = '/admin/pms/attr/';

export function getGoodsAttrPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function saveGoodsAttrApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateGoodsAttrApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function deleteGoodsAttrApi (data: any) {
	return request({
		url: `${preUrl}delete`,
		method: 'post',
		data
	})
}

export function viewGoodsAttrApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}
