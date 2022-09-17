import request from '/@/utils/request';
const preUrl = '/admin/pms/afterSale/';

export function getAfterSalePListApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}


export function viewAfterSaleApi (params: any) {
	return request({
		url: `${preUrl}view/` + params.orderId,
		method: 'get'
	})
}
