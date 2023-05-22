<template>
	<view>

		<camera class="camera" device-position="front" flash="off" v-if="authCamera"></camera>
		<button type="warn" @tap="takePhotoByHead" class="btn">拍照</button>
		<!-- <button type="primary" @tap="reverseCamera">摄像头切换</button> -->
		<view class="error-handler" v-if="!authCamera">
			<button class="nobtn" openType="openSetting">打开相机授权</button>
		</view>

	</view>
</template>

<script>
	import {
		getToken,
		faceRegister,
		faceRecognition
	} from "@/utils/recognition.js"
	export default {
		data() {
			return {
				authCamera: true,
				showHeader: true,
				ctxHeader: {},
				url: '',
			}
		},
		onShow: function() {
			//获取相机权限
			uni.getSetting({
				success: res => {
					console.log(res);
					if (res.authSetting["scope.camera"]) {
						this.authCamera = true
					} else {

						uni.authorize({
							scope: 'scope.camera',
							success: (res) => {
								console.log('44444', res);
								this.authCamera = true
							},
							fail: res => {
								console.log('555', res);
								this.authCamera = false
							}
						})
					}
				}
			})
		},
		methods: {
			//拍摄头像
			takePhotoByHead() {
				this.showHeader = true //开启拍照
				let _thats = this;
				this.ctxHeader = uni.createCameraContext();
				this.ctxHeader.takePhoto({
					quality: 'high',
					success: (res) => {
						const b64 = uni.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
						getToken().then(res => {
							const access_token = res.data['access_token']
							const group_id = 'students'
							faceRecognition(access_token, b64, group_id)
								.then(res => {
									if (res.data.error_msg === "SUCCESS") {
										// 在人脸库中对比结果 score > 80 则比对成功
										const score = res.data.result.user_list[0]
											.score
										if (score > 80) {
											uni.showToast({
												title: "该人脸已注册",
												icon: 'none'
											})


										} else {
											const user_id = uni.getStorageSync(
												"registerId")
											faceRegister(access_token, b64, group_id, user_id)
												.then(res => {
													console.log('222222', res);
													if (res.data.error_msg === "SUCCESS") {
														uni.showToast({
															title: "注册成功",
															icon: 'none'
														})
													} else {
														uni.showToast({
															title: "请正确拍摄人脸",
															icon: 'none'
														})
													}
												})
										}
									}
								})
						})

						// 			const imgURL = res.tempImagePath
						// 			console.log('res----', imgURL);
						// 			// 将图片 base64 编码
						// 			const b64 = uni.getFileSystemManager().readFileSync(imgURL, 'base64')

						// 			// console.log("b64", b64);
						// 			// 百度智能云，创建应用的 API Key
						// 			const appKey = "zAvyc6wX2FOmtOLVR3wyeqo4"
						// 			// 百度智能云，创建应用的 Secret Key
						// 			const secretKey = "npi5dxCPlmbsdqGPQgAOdKLq7fFBWiNV"
						// 			// 获取token链接
						// 			// let tokenUrl = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+appKey+'&client_secret='+secretKey

						// 			const tokenUrl =
						// 				'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' +
						// 				appKey + '&client_secret=' + secretKey
						// 			const groupId = 'students'

						// 			// 获取token
						// 			uni.request({
						// 				url: tokenUrl,
						// 				method: 'GET',
						// 				header: {
						// 					"Content-Type": "application/json; charset=UTF-8"
						// 				},
						// 				success: (res) => {
						// 					// console.log(res, 'ressss');
						// 					const access_token = res.data['access_token']
						// 					uni.request({
						// 						// 照片检测的 api url
						// 						url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' +
						// 							res.data['access_token'],
						// 						method: 'POST',
						// 						header: {
						// 							"Content-Type": "application/json"
						// 						},
						// 						// 传入的参数，请求以json格式返回
						// 						data: {
						// 							"image": b64,
						// 							"image_type": "BASE64",
						// 							"group_id_list": groupId,
						// 						},
						// 						success: (res) => {
						// 							//人脸识别请求成功
						// 							console.log('aaaaaaaaa', res);
						// 							if (res.data.error_msg === "SUCCESS") {
						// 								// 在人脸库中对比结果 score > 80 则比对成功
						// 								const score = res.data.result.user_list[0]
						// 									.score
						// 								if (score > 80) {
						// 									uni.showToast({
						// 										title: "该人脸已注册",
						// 										icon: 'none'
						// 									})
						// 									console.log('该人脸已注册');

						// 								} else {
						// 									const user_id = uni.getStorageSync(
						// 										"registerId")
						// 									console.log('id', id, groupId);
						// 									uni.request({
						// 										url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' +
						// 											access_token, //仅为示例，并非真实接口地址。
						// 										method: 'POST',
						// 										data: {
						// 											"image": b64,
						// 											"image_type": "BASE64",
						// 											"group_id": groupId,
						// 											"user_id": user_id
						// 										},
						// 										header: {
						// 											'Content-Type': 'application/json' //自定义请求头信息
						// 										},
						// 										success: (res) => {
						// 											console.log('cccc',
						// 												res
						// 											);
						// 											if (res.data
						// 												.error_msg ===
						// 												"SUCCESS") {
						// 												uni.showToast({
						// 													title: "注册成功",
						// 													icon: 'none'
						// 												})
						// 											} else {
						// 												uni.showToast({
						// 													title: "请正确拍摄人脸",
						// 													icon: 'none'
						// 												})
						// 											}
						// 										}
						// 									});

						// 								}
						// 							}

						// 						},
						// 					})
						// 				},
						// 			})
					}

				});
			},

			handleCameraError() {
				uni.showToast({
					title: '用户拒绝使用摄像头',
					icon: 'none'
				})
			},


		}
	}
</script>

<style lang="scss">
	.camera {
		width: 95%;
		height: 850rpx;
		margin: 20rpx auto;
	}

	.btn {
		width: 80%;
		margin: 80rpx auto;
	}
</style>