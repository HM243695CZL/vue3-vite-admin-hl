import request from '/@/utils/request';
const preUrl = '/admin/cms/footprint/';

export function getFootprintPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}
