import request from '/@/utils/request';
const preUrl = '/pms/goods/';

export function getGoodsPageApi(data: any) {
	return request({
		url: `${preUrl}page`
	})
}

export function saveGoodsApi(data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateGoodsApi(data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewGoodsApi( params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteGoodsApi( params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}
