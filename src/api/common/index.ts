import request from '/@/utils/request';

export const baseUrl = import.meta.env.VITE_API_URL as any;

export function postAction(url: string, data: any) {
	return request({
		url,
		method: 'post',
		data
	})
}

export function getAction(url: string, data: any) {
	return request({
		url,
		method: 'get',
		data
	})
}
