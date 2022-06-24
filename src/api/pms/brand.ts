import request from '/@/utils/request';
const preUrl = '/pms/brand/';

export function getBrandPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function getBrandListApi () {
	return request({
		url: `${preUrl}list`,
		method: 'get'
	})
}

export function saveBrandApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateBrandApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewBrandApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteBrandApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}
