export function getToken() {
	// 百度智能云，创建应用的 API Key
	const appKey = "zAvyc6wX2FOmtOLVR3wyeqo4"
	// 百度智能云，创建应用的 Secret Key
	const secretKey = "npi5dxCPlmbsdqGPQgAOdKLq7fFBWiNV"
	// 获取token链接
	// let tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+appKey+'&client_secret='+secretKey

	const tokenUrl =
		'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
		appKey + '&client_secret=' + secretKey

	return new Promise((resolve, reject) => {
		// 获取token
		uni.request({
			url: tokenUrl,
			method: 'GET',
			header: {
				"Content-Type": "application/json; charset=UTF-8"
			},
			success(res) {
				resolve(res)
			},
			fail(error) {
				reject(error)
			}
		})
	})
}


export function faceRecognition(access_token, b64, group_id_list) {

	// 将图片 base64 编码
	// const b64 = uni.getFileSystemManager().readFileSync(imgURL, 'base64')

	return new Promise((resolve, reject) => {
		uni.request({
			// 照片检测的 api url
			url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + access_token,
			method: 'POST',
			header: {
				"Content-Type": "application/json"
			},
			// 传入的参数，请求以json格式返回
			data: {
				"image": b64,
				"image_type": "BASE64",
				"group_id_list": group_id_list,
			},
			success(res) {
				resolve(res)
			},
			fail(error) {
				reject(error);
			}
		})

	})
}

export function faceRegister(access_token, b64, group_id, user_id) {

	return new Promise((resolve, reject) => {
		uni.request({
			url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' +
				access_token,
			method: 'POST',
			data: {
				"image": b64,
				"image_type": "BASE64",
				"group_id": group_id,
				"user_id": user_id
			},
			header: {
				'Content-Type': 'application/json' //自定义请求头信息
			},
			success(res) {
				resolve(res)
			},
			fail(error) {
				reject(error);
			}
		})
	})
}