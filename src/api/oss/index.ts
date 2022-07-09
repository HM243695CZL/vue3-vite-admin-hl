import request from '/@/utils/request';
const preUrl = '/admin/'
export function policy() {
	return request({
		url: `${preUrl}aliyun/oss/policy`,
		method: 'get'
	})
}
