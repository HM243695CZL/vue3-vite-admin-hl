import request from '/@/utils/request';
const preUrl = '/admin/sms/mail/';

export function getMailPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}
