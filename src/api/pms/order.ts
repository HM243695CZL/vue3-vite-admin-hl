import request from '/@/utils/request';
const preUrl = '/admin/pms/order/';

export function getOrderListApi (data: any) {
	return request({
		url: preUrl + 'list',
		method: 'post',
		data
	})
}
