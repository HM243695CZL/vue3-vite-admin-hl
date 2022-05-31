import axios from 'axios';
import { ElMessage } from 'element-plus';

/**
 * 下载文件
 * @param url 下载地址
 * @param name 文件名称
 */
export function downloadFileStream (url: string, name: string) {
	axios.get(url, {
		responseType: 'blob'
	}).then((res: any) => {
		const data = res.data
		const r = new FileReader()
		r.onload = function () {
			try {
				// @ts-ignore
				const resData = JSON.parse(this.result)
				ElMessage.error(resData.msg);
				// 如果执行到这里，说明下载报错了，进行后续处理
			} catch (err) {
				// 下载正常处理
				// let fileName = res.headers['content-disposition']
				// // 获取文件名
				// if (fileName && fileName.length >= 2) {
				// 	fileName = fileName.split('=')[1]
				// }
				const fileName = decodeURIComponent(name)
				// a标签实现下载
				let url = window.URL.createObjectURL(new Blob([data]))
				let link = document.createElement('a')
				link.style.display = 'none'
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
			}
		}
		r.readAsText(data)
	});
}