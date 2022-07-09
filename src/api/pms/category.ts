import request from '/@/utils/request';
const preUrl = '/admin/pms/category/';

export function getCategoryPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function getCategoryListApi () {
	return request({
		url: `${preUrl}list`,
		method: 'get'
	})
}

export function saveCategoryApi (data: any) {
	return request({
		url: `${preUrl}create`,
		method: 'post',
		data
	})
}

export function updateCategoryApi (data: any) {
	return request({
		url: `${preUrl}update`,
		method: 'post',
		data
	})
}

export function viewCategoryApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}

export function deleteCategoryApi (params: any) {
	return request({
		url: `${preUrl}delete/` + params.id,
		method: 'get'
	})
}

export function getFirstCateListApi () {
	return request({
		url: `${preUrl}getL1`,
		method: 'get'
	})
}
