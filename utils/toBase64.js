import axios from 'axios'

/**
 * 通过 url 获取图片并转成base64
 * @param {string} url
 * @returns {Promise<string>} - base64
 */
export async function imageToBase64(url) {
	// 获取图片的二进制数据
	const {
		data
	} = await axios.get(url, {
		responseType: 'blob'
	})
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = (event) => {
			/// 转换结束回调
			try {
				// data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD…9UoI0d6BOexAMoAdfWgzKBJQDTtQJPFAECCgB8UAzoUH/2Q==
				const fullImgBase64 = event.target.result ?? ''
				const imgBase64 = fullImgBase64?.split('base64,')[1] ?? ''
				resolve(imgBase64)
			} catch (e) {
				reject(e)
			}
		}
		// 读取 图片 二进制数据 转成 base64
		reader.readAsDataURL(data)
	})
}
