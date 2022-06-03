import request from '/@/utils/request';

export function getCoursePageApi (params: any) {
	return request({
		url: '/course/page',
		method: 'get',
		params
	})
}
export function saveCourseApi (data: any) {
	return request({
		url: '/course/create',
		method: 'post',
		data
	})
}
export function viewCourseApi (data: any) {
	return request({
		url: '/course/view',
		method: 'post',
		data
	})
}
export function deleteCourseApi (data: any) {
	return request({
		url: '/course/delete',
		method: 'post',
		data
	})
}
export function setStudentCourseApi (data: any) {
	return request({
		url: '/course/studentCourse',
		method: 'post',
		data
	})
}