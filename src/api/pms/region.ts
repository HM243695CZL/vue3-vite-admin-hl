import request from '/@/utils/request';
const preUrl = '/admin/pms/region/';

export function getRegionListApi () {
	return request({
		url: `${preUrl}list`,
		method: 'get'
	})
}
