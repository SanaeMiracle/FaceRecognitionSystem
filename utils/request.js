const $request = (url, data, method = 'POST', headers = "application/json;") => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://localhost:3000/api' + url,
			method: method,
			data: data,
			header: {
				'Content-Type': headers
			},
			success(res) {
				resolve(res)

			},
			fail(error) {
				reject(error);

			},
			complete() {}
		})
	})
}
//get请求
const $get = (url, data) => {
	return $request(url, data, 'GET')
}
//post请求
const $post = (url, data) => {
	return $request(url, data, 'POST')
}
//post请求
const $delete = (url, data) => {
	return $request(url, data, 'DELETE')
}
//给uniapp原生的requset赋值
//记得要在mian.js中引用 import '@/utils/request.js'
uni.$request = $request
uni.$get = $get
uni.$post = $post
uni.$delete = $delete