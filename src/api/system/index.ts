import request from '/@/utils/request';
const preUrl = '/admin/ums/system/';

export function getFreightInfoApi () {
	return request({
		url: `${preUrl}getFreightInfo`,
		method: 'get',
	})
}

export function getOrderInfoApi () {
	return request({
		url: `${preUrl}getOrderInfo`,
		method: 'get'
	})
}

export function updateConfigApi (data: any) {
	return request({
		url: `${preUrl}updateConfig`,
		method: 'post',
		data
	})
}
