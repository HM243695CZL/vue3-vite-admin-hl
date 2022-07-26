import request from '/@/utils/request';
const preUrl = 'admin/cms/searchHistory/';

export function getSearchHistoryPageApi (data: any) {
	return request({
		url: `${preUrl}page`,
		method: 'post',
		data
	})
}
