import request from '/@/utils/request';
const preUrl = '/admin/cms/address/';

export function getAddressPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}
