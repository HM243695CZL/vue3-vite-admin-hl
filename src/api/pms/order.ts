import request from '/@/utils/request';
const preUrl = '/admin/pms/order/';

export function getOrderListApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}

export function orderRefundApi (params: any) {
	return request({
		url: `${preUrl}refund/` + params.id,
		method: 'get',
	})
}

export function orderShipApi(data: any) {
	return request({
		url: `${preUrl}ship`,
		method: 'post',
		data
	})
}


export function viewOrderApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.id,
		method: 'get'
	})
}
